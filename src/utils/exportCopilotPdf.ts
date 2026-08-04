import { CopilotReport } from './copilotEngine';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text?: string;
  report?: CopilotReport;
  timestamp: string;
  ideaTitle?: string;
}

export function exportCopilotChatToPdf(
  messages: ChatMessage[],
  activeIdeaTitle: string = 'Buildora Business Advisory'
) {
  if (!messages || messages.length === 0) return;

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to export the business advisor report PDF.');
    return;
  }

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const contentHtml = messages
    .map((msg) => {
      if (msg.sender === 'user') {
        return `
          <div style="margin-top: 24px; margin-bottom: 12px; padding: 12px 16px; background-color: #f4f4f5; border-left: 4px solid #8b5cf6; border-radius: 6px;">
            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #6b21a8; margin-bottom: 4px;">
              USER QUESTION • ${msg.timestamp}
            </div>
            <div style="font-size: 14px; font-weight: 600; color: #18181b;">
              ${escapeHtml(msg.text || '')}
            </div>
          </div>
        `;
      }

      if (msg.report) {
        const r = msg.report;
        const itemsHtml = r.estimatedCost.items
          .map(
            (item) => `
            <tr>
              <td style="padding: 8px 12px; border-bottom: 1px solid #e4e4e7; font-weight: 600; color: #27272a;">${escapeHtml(item.label)}</td>
              <td style="padding: 8px 12px; border-bottom: 1px solid #e4e4e7; font-weight: 700; color: #059669; text-align: right;">${escapeHtml(item.value)}</td>
              <td style="padding: 8px 12px; border-bottom: 1px solid #e4e4e7; font-size: 12px; color: #71717a;">${escapeHtml(item.note || '')}</td>
            </tr>
          `
          )
          .join('');

        const recsHtml = r.recommendations
          .map((item) => `<li style="margin-bottom: 6px; color: #27272a;">${escapeHtml(item)}</li>`)
          .join('');

        const stepsHtml = r.nextSteps
          .map((item) => `<li style="margin-bottom: 6px; color: #27272a;">${escapeHtml(item)}</li>`)
          .join('');

        const tipsHtml = r.tips
          .map((item) => `<li style="margin-bottom: 6px; color: #27272a;">${escapeHtml(item)}</li>`)
          .join('');

        const notesHtml = r.importantNotes
          .map((item) => `<li style="margin-bottom: 6px; color: #27272a;">${escapeHtml(item)}</li>`)
          .join('');

        return `
          <div style="margin-bottom: 32px; padding: 20px; background-color: #ffffff; border: 1px solid #e4e4e7; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #8b5cf6; padding-bottom: 8px; margin-bottom: 16px;">
              <span style="font-size: 13px; font-weight: 700; color: #7c3aed; text-transform: uppercase; tracking: 0.05em;">BUILDORA AI ADVISOR REPORT</span>
              <span style="font-size: 11px; color: #71717a;">${msg.timestamp}</span>
            </div>

            <div style="margin-bottom: 16px;">
              <h3 style="font-size: 14px; font-weight: 700; color: #09090b; margin: 0 0 6px 0; text-transform: uppercase;">Summary</h3>
              <p style="font-size: 13px; line-height: 1.6; color: #3f3f46; margin: 0;">${escapeHtml(r.summary)}</p>
            </div>

            <div style="margin-bottom: 16px;">
              <h3 style="font-size: 14px; font-weight: 700; color: #09090b; margin: 0 0 6px 0; text-transform: uppercase;">Recommendations</h3>
              <ul style="font-size: 13px; line-height: 1.5; padding-left: 20px; margin: 0;">${recsHtml}</ul>
            </div>

            <div style="margin-bottom: 16px;">
              <h3 style="font-size: 14px; font-weight: 700; color: #09090b; margin: 0 0 8px 0; text-transform: uppercase;">${escapeHtml(r.estimatedCost.title)}</h3>
              <table style="width: 100%; border-collapse: collapse; font-size: 13px; background-color: #fafafa; border: 1px solid #e4e4e7; border-radius: 6px;">
                <thead>
                  <tr style="background-color: #f4f4f5; text-align: left; font-size: 11px; text-transform: uppercase; color: #52525b;">
                    <th style="padding: 8px 12px; border-bottom: 1px solid #e4e4e7;">Metric</th>
                    <th style="padding: 8px 12px; border-bottom: 1px solid #e4e4e7; text-align: right;">Value</th>
                    <th style="padding: 8px 12px; border-bottom: 1px solid #e4e4e7;">Notes</th>
                  </tr>
                </thead>
                <tbody>${itemsHtml}</tbody>
              </table>
            </div>

            <div style="margin-bottom: 16px;">
              <h3 style="font-size: 14px; font-weight: 700; color: #09090b; margin: 0 0 6px 0; text-transform: uppercase;">Next Steps</h3>
              <ul style="font-size: 13px; line-height: 1.5; padding-left: 20px; margin: 0;">${stepsHtml}</ul>
            </div>

            <div style="margin-bottom: 16px;">
              <h3 style="font-size: 14px; font-weight: 700; color: #09090b; margin: 0 0 6px 0; text-transform: uppercase;">Tips</h3>
              <ul style="font-size: 13px; line-height: 1.5; padding-left: 20px; margin: 0;">${tipsHtml}</ul>
            </div>

            <div>
              <h3 style="font-size: 14px; font-weight: 700; color: #09090b; margin: 0 0 6px 0; text-transform: uppercase;">Important Notes</h3>
              <ul style="font-size: 13px; line-height: 1.5; padding-left: 20px; margin: 0;">${notesHtml}</ul>
            </div>
          </div>
        `;
      }

      return `<p style="font-size: 13px; color: #3f3f46;">${escapeHtml(msg.text || '')}</p>`;
    })
    .join('');

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Buildora AI Copilot Report - ${escapeHtml(activeIdeaTitle)}</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            margin: 0;
            padding: 40px;
            color: #18181b;
            background-color: #ffffff;
          }
          @media print {
            body { padding: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div style="max-width: 800px; margin: 0 auto;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #18181b; padding-bottom: 16px; margin-bottom: 24px;">
            <div>
              <h1 style="font-size: 24px; font-weight: 800; margin: 0; color: #09090b;">Buildora AI Copilot</h1>
              <p style="font-size: 13px; color: #71717a; margin: 4px 0 0 0;">Executive Feasibility & Business Advisory Report</p>
            </div>
            <div style="text-align: right;">
              <div style="font-size: 14px; font-weight: 700; color: #7c3aed;">${escapeHtml(activeIdeaTitle)}</div>
              <div style="font-size: 11px; color: #a1a1aa; margin-top: 2px;">Generated: ${currentDate}</div>
            </div>
          </div>

          <div className="no-print" style="margin-bottom: 24px; text-align: right;">
            <button onclick="window.print()" style="background: linear-gradient(135deg, #AB51EF 0%, #E6489D 50%, #687CEF 100%); color: white; border: none; padding: 10px 20px; font-size: 13px; font-weight: 700; border-radius: 6px; cursor: pointer;">
              🖨️ Save as PDF / Print Report
            </button>
          </div>

          <div>
            ${contentHtml}
          </div>

          <div style="margin-top: 40px; pt-16 border-top: 1px solid #e4e4e7; font-size: 11px; color: #a1a1aa; text-align: center;">
            Generated by Buildora AI Business Advisor • Confidential Business Document
          </div>
        </div>
        <script>
          setTimeout(() => {
            window.print();
          }, 500);
        </script>
      </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
