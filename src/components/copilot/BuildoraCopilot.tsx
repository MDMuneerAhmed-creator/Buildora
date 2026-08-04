import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import {
  Rocket,
  Sparkles,
  Bot,
  Send,
  X,
  Trash2,
  Download,
  Copy,
  Check,
  RefreshCw,
  ChevronRight,
  TrendingUp,
  DollarSign,
  Truck,
  ShieldCheck,
  Megaphone,
  Briefcase,
  HelpCircle,
  Lightbulb,
  FileText,
  Compass,
  Zap,
  Globe,
  AlertTriangle
} from 'lucide-react';
import { useRoadmap } from '../../context/RoadmapContext';
import { SAMPLE_BUSINESS_IDEAS, getOrCreateBusinessIdea } from '../../data/businessIdeas';
import { BusinessIdea } from '../../types';
import { generateCopilotResponse, CopilotReport } from '../../utils/copilotEngine';
import { exportCopilotChatToPdf, ChatMessage } from '../../utils/exportCopilotPdf';

// MODE 1 Quick Suggestion Chips (General Entrepreneurship)
const MODE_1_QUICK_CHIPS = [
  { label: '💡 Trending Businesses', prompt: 'Suggest top trending business ideas right now.' },
  { label: '🏭 Manufacturing Ideas', prompt: 'What are the most profitable manufacturing business ideas?' },
  { label: '💰 Low Investment', prompt: 'What businesses can I start with low initial investment?' },
  { label: '📈 High Profit', prompt: 'Which business ideas have the highest net profit margin and ROI?' },
  { label: '🌱 Sustainable Businesses', prompt: 'Suggest eco-friendly and sustainable business ideas.' },
  { label: '📦 Product Ideas', prompt: 'What physical product businesses can I start and sell online?' },
  { label: '🤖 AI Business Ideas', prompt: 'What AI-powered or tech-enabled business ideas can I start?' },
  { label: '🚀 Startup Roadmap', prompt: 'How do I create a step-by-step startup roadmap for a new business?' },
];

// MODE 2 Quick Suggestion Chips (Business Specific Context)
const MODE_2_QUICK_CHIPS = [
  { label: 'Roadmap', prompt: 'Give me a complete step-by-step roadmap to start this business.', icon: <Briefcase className="h-3 w-3" /> },
  { label: 'Investment', prompt: 'How much total initial investment and monthly expense is required?', icon: <DollarSign className="h-3 w-3" /> },
  { label: 'Suppliers', prompt: 'Which suppliers and machinery vendors should I contact?', icon: <Truck className="h-3 w-3" /> },
  { label: 'Machinery', prompt: 'What specific machinery and equipment do I need to procure?', icon: <Briefcase className="h-3 w-3" /> },
  { label: 'Marketing', prompt: 'How should I market and sell this product to customers?', icon: <Megaphone className="h-3 w-3" /> },
  { label: 'Legal', prompt: 'Which licenses, GST rates, and legal registrations are required?', icon: <ShieldCheck className="h-3 w-3" /> },
  { label: 'ROI', prompt: 'What is the estimated monthly net profit margin and 12-month ROI?', icon: <TrendingUp className="h-3 w-3" /> },
  { label: 'SWOT', prompt: 'Provide a strategic SWOT analysis, risk factors, and market trends.', icon: <HelpCircle className="h-3 w-3" /> },
];

export const BuildoraCopilot: React.FC = () => {
  const location = useLocation();
  const { ideaSlug } = useParams<{ ideaSlug?: string }>();
  const { currency, currentUser, isGuest, copilotHistory, saveCopilotHistory } = useRoadmap();

  const [isOpen, setIsOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 1. Context Resolution & Mode Determination
  // Match path to check if we are inside a roadmap
  const roadmapMatch = location.pathname.match(/\/roadmap\/([^/]+)/);
  const currentSlug = ideaSlug || (roadmapMatch ? decodeURIComponent(roadmapMatch[1]) : null);
  const isRoadmapMode = !!currentSlug;

  const mode: 'general' | 'business' = isRoadmapMode ? 'business' : 'general';

  // Active business idea when in Business Mode
  const activeIdea: BusinessIdea | null = currentSlug ? getOrCreateBusinessIdea(currentSlug) : null;

  // 2. Chat history synced with Context / Firestore
  const [messages, setMessages] = useState<ChatMessage[]>(copilotHistory || []);

  // Keep local messages in sync when context copilotHistory changes (e.g. login/logout)
  useEffect(() => {
    setMessages(copilotHistory || []);
  }, [copilotHistory]);

  // Handle message submission
  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query || isGenerating) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMsg: ChatMessage = {
      id: 'msg_' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: timeStr,
      ideaTitle: activeIdea ? activeIdea.title : 'General Entrepreneurship',
    };

    const updatedWithUser = [...messages, userMsg];
    setMessages(updatedWithUser);
    saveCopilotHistory(updatedWithUser);

    if (!textToSend) setInputQuery('');
    setIsGenerating(true);

    // AI analysis & response generation
    try {
      const res = await generateCopilotResponse(query, activeIdea, currency, mode);
      const assistantMsg: ChatMessage = {
        id: 'msg_ai_' + Date.now(),
        sender: 'assistant',
        report: res.report,
        text: res.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        ideaTitle: activeIdea ? activeIdea.title : 'General Entrepreneurship',
      };

      const updatedWithAI = [...updatedWithUser, assistantMsg];
      setMessages(updatedWithAI);
      saveCopilotHistory(updatedWithAI);
    } catch (error) {
      console.error('Failed to get response', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClearChat = () => {
    if (window.confirm('Clear all conversation history with Buildora AI Copilot?')) {
      setMessages([]);
      saveCopilotHistory([]);
    }
  };

  const handleCopy = (textToCopy: string, id: string) => {
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRegenerate = (index: number) => {
    for (let i = index - 1; i >= 0; i--) {
      if (messages[i].sender === 'user' && messages[i].text) {
        handleSendMessage(messages[i].text);
        break;
      }
    }
  };

  const formatReportToPlainText = (report: CopilotReport): string => {
    const costs = report.estimatedCost.items
      .map((i) => `• ${i.label}: ${i.value} (${i.note || ''})`)
      .join('\n');
    const title = activeIdea ? activeIdea.title : 'General Business Advisory';
    return `
BUILDORA AI ADVISOR REPORT - ${title}
----------------------------------------
SUMMARY:
${report.summary}

RECOMMENDATIONS:
${report.recommendations.map((r) => `• ${r}`).join('\n')}

${report.estimatedCost.title.toUpperCase()}:
${costs}

NEXT STEPS:
${report.nextSteps.map((s) => `• ${s}`).join('\n')}

TIPS:
${report.tips.map((t) => `• ${t}`).join('\n')}

IMPORTANT NOTES:
${report.importantNotes.map((n) => `• ${n}`).join('\n')}
    `.trim();
  };

  return (
    <>
      {/* FLOATING TOGGLE BUTTON (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open Buildora AI Copilot"
            className="group relative flex items-center justify-center rounded-full p-4 text-white shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-hidden focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 dark:focus:ring-offset-zinc-950"
            style={{
              background: 'linear-gradient(135deg, #AB51EF 0%, #E6489D 50%, #687CEF 100%)',
              boxShadow: '0 10px 25px -5px rgba(171, 81, 239, 0.4), 0 8px 10px -6px rgba(230, 72, 157, 0.3)',
            }}
          >
            {/* Glow animation */}
            <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 opacity-40 blur-md transition-opacity group-hover:opacity-80 animate-pulse" />

            <div className="relative flex items-center justify-center">
              <Rocket className="h-6 w-6 text-white" />
              <span className="absolute -top-1 -left-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-300"></span>
              </span>
            </div>
          </button>
        )}
      </div>

      {/* OVERLAY BACKDROP */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SLIDE-IN AI CHAT PANEL */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[480px] md:w-[520px] bg-zinc-950 text-zinc-100 flex flex-col shadow-2xl border-l border-zinc-800/80 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* PANEL HEADER */}
        <div className="relative flex items-center justify-between px-5 py-4 border-b border-zinc-800/80 bg-zinc-900/90 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-md shrink-0 transition-transform duration-300"
              style={{
                background: 'linear-gradient(135deg, #AB51EF 0%, #E6489D 50%, #687CEF 100%)',
              }}
            >
              <Rocket className="h-5 w-5 text-white" />
            </div>

            <div className="flex flex-col transition-all duration-300">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-zinc-100 tracking-tight flex items-center gap-1.5">
                  Copilot
                </h2>
                {mode === 'general' ? (
                  <span className="rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 px-2.5 py-0.5 text-[10px] font-semibold text-indigo-300 transition-all duration-300">
                    General Business Advisor
                  </span>
                ) : (
                  <span className="rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 px-2.5 py-0.5 text-[10px] font-semibold text-purple-300 transition-all duration-300">
                    Advisor
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-400">
                {mode === 'general'
                  ? 'General Entrepreneurship & Startup Guide'
                  : `Active: ${activeIdea?.title}`}
              </p>
            </div>
          </div>

          {/* Action Header Controls */}
          <div className="flex items-center gap-1">
            {messages.length > 0 && (
              <>
                <button
                  onClick={() =>
                    exportCopilotChatToPdf(
                      messages,
                      activeIdea ? activeIdea.title : 'Buildora General Business Advisory'
                    )
                  }
                  title="Export Report / Save as PDF"
                  className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-lg transition-colors"
                >
                  <Download className="h-4 w-4" />
                </button>
                <button
                  onClick={handleClearChat}
                  title="Clear Chat History"
                  className="p-2 text-zinc-400 hover:text-rose-400 hover:bg-zinc-800 rounded-lg transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </>
            )}
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-lg transition-colors"
              title="Close Panel"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* ACTIVE CONTEXT STRIP WITH SMOOTH TRANSITION */}
        <div className="bg-zinc-900/60 border-b border-zinc-800/50 px-5 py-2.5 flex items-center justify-between text-xs transition-all duration-300 ease-in-out">
          {mode === 'general' ? (
            <>
              <div className="flex items-center gap-2 text-zinc-300 truncate">
                <span className="h-2 w-2 rounded-full bg-indigo-400 shrink-0 animate-pulse" />
                <span className="text-zinc-400 shrink-0 font-medium">Mode:</span>
                <span className="font-semibold text-indigo-300 truncate">General Business Advisor</span>
              </div>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-indigo-950/80 border border-indigo-800/50 text-indigo-300 rounded-md shrink-0">
                All Industries
              </span>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 text-zinc-300 truncate">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shrink-0" />
                <span className="text-zinc-400 shrink-0 font-medium">Active Business:</span>
                <span className="font-semibold text-purple-300 truncate">{activeIdea?.title}</span>
              </div>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-zinc-800 text-zinc-400 rounded-md shrink-0">
                {activeIdea?.category}
              </span>
            </>
          )}
        </div>

        {/* CHAT MESSAGES AREA */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin scrollbar-thumb-zinc-800">
          {messages.length === 0 ? (
            /* EMPTY STATES FOR MODE 1 VS MODE 2 */
            mode === 'general' ? (
              /* MODE 1: GENERAL BUSINESS ADVISOR GREETING */
              <div className="h-full flex flex-col items-center justify-center text-center p-4 text-zinc-400">
                <div
                  className="h-12 w-12 rounded-2xl flex items-center justify-center mb-3 text-white shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #AB51EF 0%, #E6489D 50%, #687CEF 100%)',
                  }}
                >
                  <Rocket className="h-6 w-6" />
                </div>

                <div className="w-full max-w-sm mb-5 bg-zinc-900/90 border border-zinc-800/90 rounded-2xl p-4 text-left space-y-2 shadow-lg">
                  <p className="font-bold text-sm text-purple-300">
                    Hi! I'm your Buildora AI Business Advisor.
                  </p>
                  <p className="text-xs text-zinc-400">I can help you:</p>
                  <ul className="space-y-1 text-xs text-zinc-200 font-medium pl-1">
                    <li className="flex items-center gap-1.5"><span className="text-purple-400">•</span> Find profitable business ideas</li>
                    <li className="flex items-center gap-1.5"><span className="text-purple-400">•</span> Compare industries</li>
                    <li className="flex items-center gap-1.5"><span className="text-purple-400">•</span> Estimate startup costs</li>
                    <li className="flex items-center gap-1.5"><span className="text-purple-400">•</span> Suggest machinery</li>
                    <li className="flex items-center gap-1.5"><span className="text-purple-400">•</span> Recommend suppliers</li>
                    <li className="flex items-center gap-1.5"><span className="text-purple-400">•</span> Explain licenses</li>
                    <li className="flex items-center gap-1.5"><span className="text-purple-400">•</span> Build business roadmaps</li>
                    <li className="flex items-center gap-1.5"><span className="text-purple-400">•</span> Answer any entrepreneurship question</li>
                  </ul>
                  <p className="text-xs font-bold text-amber-300 pt-1">
                    What would you like to build today?
                  </p>
                </div>

                {/* Example Questions for Mode 1 */}
                <div className="w-full space-y-2 text-left">
                  <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">
                    Example questions:
                  </p>
                  {[
                    "What business can I start with ₹5 lakh?",
                    "Suggest trending manufacturing businesses.",
                    "Which business has the highest ROI?",
                    "What business is easiest to export?"
                  ].map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(q)}
                      className="w-full text-xs text-zinc-300 bg-zinc-900/80 hover:bg-zinc-800/80 border border-zinc-800/80 hover:border-purple-500/40 p-3 rounded-xl transition-all flex items-center justify-between group text-left"
                    >
                      <span className="line-clamp-1">{q}</span>
                      <ChevronRight className="h-3.5 w-3.5 text-zinc-500 group-hover:text-purple-400 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* MODE 2: BUSINESS CONTEXT GREETING */
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-zinc-400">
                <div
                  className="h-14 w-14 rounded-2xl flex items-center justify-center mb-4 text-white shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #AB51EF 0%, #E6489D 50%, #687CEF 100%)',
                  }}
                >
                  <Rocket className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-bold text-zinc-100 mb-1">
                  Welcome to Buildora AI Advisor
                </h3>
                <p className="text-xs text-zinc-400 max-w-xs mb-6">
                  I am synchronized with <span className="text-purple-300 font-medium">{activeIdea?.title}</span>. Ask me anything about startup investment, suppliers, licenses, or marketing!
                </p>

                {/* Sample prompt cards for active business */}
                <div className="w-full space-y-2 text-left">
                  <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                    Try asking:
                  </p>
                  {[
                    `How do I start the ${activeIdea?.title} business step by step?`,
                    `How much initial investment and monthly expenses are needed?`,
                    `Which machinery, suppliers, and licenses are required?`,
                    `What are the marketing strategies to get customers quickly?`
                  ].map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(q)}
                      className="w-full text-xs text-zinc-300 bg-zinc-900/80 hover:bg-zinc-800/80 border border-zinc-800/80 hover:border-purple-500/40 p-3 rounded-xl transition-all flex items-center justify-between group text-left"
                    >
                      <span className="line-clamp-1">{q}</span>
                      <ChevronRight className="h-3.5 w-3.5 text-zinc-500 group-hover:text-purple-400 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                    </button>
                  ))}
                </div>
              </div>
            )
          ) : (
            /* MESSAGE LIST */
            messages.map((msg, index) => (
              <div
                key={msg.id || index}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                {/* User Message */}
                {msg.sender === 'user' && (
                  <div className="max-w-[85%] rounded-2xl rounded-tr-xs bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-3 text-sm text-white shadow-md">
                    <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    <span className="block text-[10px] text-purple-200/70 text-right mt-1">
                      {msg.timestamp}
                    </span>
                  </div>
                )}

                {/* AI Assistant Report Message */}
                {msg.sender === 'assistant' && msg.report && (
                  <div className="w-full rounded-2xl bg-zinc-900 border border-zinc-800/90 p-4 shadow-xl space-y-4">
                    {/* Header bar */}
                    <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2.5">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-purple-400" />
                        <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">
                          Buildora Feasibility Report
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleCopy(formatReportToPlainText(msg.report!), msg.id)}
                          title="Copy Report"
                          className="p-1.5 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-md transition-colors text-xs flex items-center gap-1"
                        >
                          {copiedId === msg.id ? (
                            <Check className="h-3.5 w-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                        </button>
                        <button
                          onClick={() => handleRegenerate(index)}
                          title="Regenerate Answer"
                          className="p-1.5 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-md transition-colors"
                        >
                          <RefreshCw className="h-3.5 w-3.5" />
                        </button>
                        <span className="text-[10px] text-zinc-500 ml-1">{msg.timestamp}</span>
                      </div>
                    </div>

                    {/* Section 1: Summary */}
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
                        <FileText className="h-3.5 w-3.5 text-purple-400" /> Summary
                      </h4>
                      <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-950/60 p-3 rounded-xl border border-zinc-800/50">
                        {msg.report.summary}
                      </p>
                    </div>

                    {/* Section 2: Recommendations */}
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
                        <Lightbulb className="h-3.5 w-3.5 text-amber-400" /> Recommendations
                      </h4>
                      <ul className="space-y-1.5 text-xs text-zinc-300 bg-zinc-950/60 p-3 rounded-xl border border-zinc-800/50">
                        {msg.report.recommendations.map((rec, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-amber-400 font-bold">•</span>
                            <span className="leading-relaxed">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Section 3: Estimated Cost */}
                    <div className="space-y-1.5">
                      <h4 className="text-xs font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
                        <DollarSign className="h-3.5 w-3.5 text-emerald-400" /> {msg.report.estimatedCost.title}
                      </h4>
                      <div className="bg-zinc-950/80 rounded-xl border border-zinc-800/60 overflow-hidden divide-y divide-zinc-800/60">
                        {msg.report.estimatedCost.items.map((item, i) => (
                          <div key={i} className="p-2.5 flex items-center justify-between text-xs">
                            <div className="flex flex-col">
                              <span className="font-medium text-zinc-200">{item.label}</span>
                              {item.note && <span className="text-[10px] text-zinc-500">{item.note}</span>}
                            </div>
                            <span className="font-bold text-emerald-400 font-mono text-xs">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Section 4: Next Steps */}
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
                        <Briefcase className="h-3.5 w-3.5 text-indigo-400" /> Next Steps
                      </h4>
                      <ul className="space-y-1.5 text-xs text-zinc-300 bg-zinc-950/60 p-3 rounded-xl border border-zinc-800/50">
                        {msg.report.nextSteps.map((step, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-indigo-400 font-bold">{i + 1}.</span>
                            <span className="leading-relaxed">{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Section 5: Tips */}
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-cyan-400" /> Strategic Tips
                      </h4>
                      <ul className="space-y-1 text-xs text-zinc-300 bg-zinc-950/60 p-3 rounded-xl border border-zinc-800/50">
                        {msg.report.tips.map((tip, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-cyan-400">💡</span>
                            <span className="leading-relaxed">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Section 6: Important Notes */}
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
                        <ShieldCheck className="h-3.5 w-3.5 text-rose-400" /> Important Notes
                      </h4>
                      <ul className="space-y-1 text-xs text-zinc-400 bg-zinc-950/60 p-3 rounded-xl border border-zinc-800/50">
                        {msg.report.importantNotes.map((note, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-rose-400 font-bold">!</span>
                            <span className="leading-relaxed">{note}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* AI Assistant Clarification / Text Message */}
                {msg.sender === 'assistant' && !msg.report && msg.text && (
                  msg.text.toLowerCase() === 'invalid input' ? (
                    <div className="w-full rounded-2xl bg-zinc-900 border border-zinc-800/90 p-4 shadow-xl space-y-3">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                        <span className="font-bold text-amber-500 text-sm">Invalid Input</span>
                      </div>
                      <p className="text-zinc-200 text-sm leading-relaxed whitespace-pre-wrap">
                        ⚠️ I couldn't understand your request.{"\n\n"}
                        Please ask a business-related question such as:{"\n"}
                        • How can I start a business with ₹50,000?{"\n"}
                        • Suggest profitable startup ideas.{"\n"}
                        • How do I register a company?{"\n"}
                        • Create a business plan for a cafe.{"\n"}
                        • Explain GST for small businesses.
                      </p>
                    </div>
                  ) : (
                    <div className="w-full rounded-2xl bg-zinc-900 border border-zinc-800/90 p-4 shadow-xl space-y-3">
                      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-purple-400" />
                          <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">
                            Buildora AI Advisor
                          </span>
                        </div>
                        <span className="text-[10px] text-zinc-500">{msg.timestamp}</span>
                      </div>

                      <p className="text-xs text-zinc-300 leading-relaxed whitespace-pre-line">
                        {msg.text}
                      </p>

                      {/* Interactive Clickable Suggestion Prompts */}
                      <div className="pt-2 border-t border-zinc-800/60 space-y-2">
                        <p className="text-[11px] font-semibold text-zinc-400">
                          Try asking something like:
                        </p>
                        <div className="space-y-1.5">
                          {[
                            'What business can I start with ₹5 lakh?',
                            'Suggest manufacturing ideas.',
                            'What licenses are required?',
                            'Estimate startup cost.',
                            'Compare coffee and juice businesses.'
                          ].map((samplePrompt, pIdx) => (
                            <button
                              key={pIdx}
                              onClick={() => handleSendMessage(samplePrompt)}
                              className="w-full text-left text-xs text-zinc-300 bg-zinc-950/70 hover:bg-zinc-800/80 border border-zinc-800 hover:border-purple-500/50 p-2.5 rounded-xl transition-all flex items-center justify-between group"
                            >
                              <span className="flex items-center gap-2">
                                <span className="text-purple-400 font-bold">•</span>
                                <span>{samplePrompt}</span>
                              </span>
                              <ChevronRight className="h-3.5 w-3.5 text-zinc-500 group-hover:text-purple-400 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            ))
          )}

          {/* TYPING ANIMATION INDICATOR */}
          {isGenerating && (
            <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800/80 p-3.5 rounded-2xl w-fit">
              <div
                className="h-6 w-6 rounded-lg flex items-center justify-center text-white"
                style={{
                  background: 'linear-gradient(135deg, #AB51EF 0%, #E6489D 50%, #687CEF 100%)',
                }}
              >
                <Rocket className="h-3.5 w-3.5 animate-bounce" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-zinc-400 font-medium">Buildora AI is analyzing business feasibility...</span>
                <div className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />
                  <span className="h-1.5 w-1.5 rounded-full bg-pink-400 animate-pulse delay-150" />
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse delay-300" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* QUICK SUGGESTION CHIPS (MODE SPECIFIC) */}
        <div className="border-t border-zinc-800/80 bg-zinc-950 px-3 py-2.5 transition-all duration-300">
          <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-2 px-1">
            {mode === 'general' ? 'General Quick Actions:' : 'Active Business Actions:'}
          </p>
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {mode === 'general'
              ? MODE_1_QUICK_CHIPS.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(chip.prompt)}
                    disabled={isGenerating}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-purple-500/40 text-zinc-300 hover:text-white transition-all whitespace-nowrap shrink-0 active:scale-95 disabled:opacity-50"
                  >
                    <span>{chip.label}</span>
                  </button>
                ))
              : MODE_2_QUICK_CHIPS.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(chip.prompt)}
                    disabled={isGenerating}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-purple-500/40 text-zinc-300 hover:text-white transition-all whitespace-nowrap shrink-0 active:scale-95 disabled:opacity-50"
                  >
                    {chip.icon}
                    <span>{chip.label}</span>
                  </button>
                ))}
          </div>
        </div>

        {/* INPUT BOX & SEND BUTTON */}
        <div className="p-4 border-t border-zinc-800/80 bg-zinc-900/90 backdrop-blur-md">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder={
                mode === 'general'
                  ? 'Ask any entrepreneurship question... (e.g. What business to start with ₹5 lakh?)'
                  : `Ask about ${activeIdea?.title}...`
              }
              disabled={isGenerating}
              className="flex-1 rounded-xl bg-black px-4 py-3 text-xs text-white placeholder-zinc-400 border border-zinc-800 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isGenerating}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-md transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95 shrink-0"
              style={{
                background: 'linear-gradient(135deg, #AB51EF 0%, #E6489D 50%, #687CEF 100%)',
              }}
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
