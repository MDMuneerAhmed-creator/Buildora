import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Building2,
  MapPin,
  Mail,
  Phone,
  Award,
  CheckCircle2,
  Bookmark,
  Edit3,
  Sparkles,
  Save,
  X,
  Compass,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  GraduationCap,
  Camera,
  LogOut,
  Globe,
  Coins,
  Briefcase,
  Layers,
  AlertCircle,
  Trash2,
} from 'lucide-react';
import { useRoadmap } from '../context/RoadmapContext';
import { getOrCreateBusinessIdea } from '../data/businessIdeas';
import { formatCurrency, CURRENCY_CONFIG, CurrencyCode } from '../utils/formatters';
import { BusinessCategory } from '../types';

const CATEGORIES: BusinessCategory[] = [
  'Manufacturing',
  'FMCG & Consumer Products',
  'Agro-Tech & Organic',
  'Green Tech & Clean Energy',
  'Hardware & Electronics',
  'Artisanal & Crafts',
  'Services & Franchise',
];

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const {
    currentUser,
    userProfile,
    updateUserProfile,
    savedIdeas,
    isTaskCompleted,
    currency,
    logout,
    isGuest,
  } = useRoadmap();

  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state initialized from current user profile
  const [formData, setFormData] = useState({
    name: userProfile.name || '',
    email: userProfile.email || '',
    phoneNumber: userProfile.phoneNumber || '',
    university: userProfile.university || '',
    occupation: userProfile.occupation || 'Founder',
    location: userProfile.location || 'India',
    bio: userProfile.bio || '',
    preferredCategory: (userProfile.preferredCategory as BusinessCategory) || 'Manufacturing',
    currency: (userProfile.currency as CurrencyCode) || 'INR',
    language: userProfile.language || 'English',
    avatarUrl: userProfile.avatarUrl || '',
  });

  const [photoPreview, setPhotoPreview] = useState<string>(userProfile.avatarUrl || '');

  // Handle Photo Upload via Base64 Data URL
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File size must be under 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPhotoPreview(result);
        setFormData((prev) => ({ ...prev, avatarUrl: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setPhotoPreview('');
    setFormData((prev) => ({ ...prev, avatarUrl: '' }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile(formData);
    setIsEditing(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/welcome');
  };

  // Calculate stats
  let totalTasksCount = 0;
  let totalCompletedTasksCount = 0;

  savedIdeas.forEach((saved) => {
    const idea = getOrCreateBusinessIdea(saved.ideaId);
    totalTasksCount += idea.launchTasks.length;
    totalCompletedTasksCount += idea.launchTasks.filter((t) =>
      isTaskCompleted(idea.id, t.id, t.completed)
    ).length;
  });

  const overallProgressPercent =
    totalTasksCount > 0 ? Math.round((totalCompletedTasksCount / totalTasksCount) * 100) : 0;

  return (
    <div className="space-y-8 py-6">
      
      {/* Page Title & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-6 dark:border-zinc-800">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <User className="h-6 w-6 text-emerald-600" />
            <span>Founder Profile & Settings</span>
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Manage your personal profile, preferred currency, focus categories, and launch statistics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setFormData({
                name: userProfile.name || '',
                email: userProfile.email || '',
                phoneNumber: userProfile.phoneNumber || '',
                university: userProfile.university || '',
                occupation: userProfile.occupation || 'Founder',
                location: userProfile.location || 'India',
                bio: userProfile.bio || '',
                preferredCategory: (userProfile.preferredCategory as BusinessCategory) || 'Manufacturing',
                currency: (userProfile.currency as CurrencyCode) || 'INR',
                language: userProfile.language || 'English',
                avatarUrl: userProfile.avatarUrl || '',
              });
              setPhotoPreview(userProfile.avatarUrl || '');
              setIsEditing(true);
            }}
            className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-900 px-4 py-2 text-xs font-semibold text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-all shadow-xs"
          >
            <Edit3 className="h-3.5 w-3.5" />
            <span>Edit Profile Settings</span>
          </button>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-rose-400 dark:hover:bg-rose-950/40 transition-all shadow-xs"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* Guest Mode Alert Banner */}
      {isGuest && (
        <div className="rounded-2xl border border-amber-200/80 bg-amber-50/80 p-4 dark:border-amber-900/50 dark:bg-amber-950/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-amber-900 dark:text-amber-200">
                You are exploring as a Guest Founder
              </p>
              <p className="text-[11px] text-amber-800/80 dark:text-amber-300">
                Create a permanent account to sync saved roadmaps and custom feasibility settings across devices.
              </p>
            </div>
          </div>
          <Link
            to="/signup"
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-amber-600 px-4 py-2 text-xs font-bold text-white hover:bg-amber-700 transition-all shrink-0"
          >
            <span>Create Account Now</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      )}

      {/* Main Profile Header Card */}
      <div className="rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Avatar Circle / Photo */}
            <div className="relative group">
              {userProfile.avatarUrl ? (
                <img
                  src={userProfile.avatarUrl}
                  alt={userProfile.name}
                  referrerPolicy="no-referrer"
                  className="h-20 w-20 shrink-0 rounded-2xl object-cover ring-2 ring-emerald-500/30 shadow-md"
                />
              ) : (
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-2xl font-extrabold text-white shadow-md">
                  {(userProfile.name || 'G')
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .slice(0, 2)
                    .toUpperCase()}
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                  {userProfile.name || 'Anonymous Founder'}
                </h2>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
                  <ShieldCheck className="h-3 w-3 text-emerald-600" />
                  {isGuest ? 'Guest Session' : 'Registered Founder'}
                </span>
              </div>

              <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-300 flex items-center gap-1.5">
                <Briefcase className="h-3.5 w-3.5 text-indigo-500" />
                <span>{userProfile.occupation || 'Entrepreneur'}</span>
                {userProfile.university && (
                  <>
                    <span>•</span>
                    <GraduationCap className="h-3.5 w-3.5 text-zinc-400" />
                    <span>{userProfile.university}</span>
                  </>
                )}
              </p>

              <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 pt-1">
                <span className="flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5 text-zinc-400" />
                  {userProfile.email || 'No email set'}
                </span>
                {userProfile.phoneNumber && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Phone className="h-3.5 w-3.5 text-zinc-400" />
                      {userProfile.phoneNumber}
                    </span>
                  </>
                )}
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-zinc-400" />
                  {userProfile.location || 'Global'}
                </span>
              </div>
            </div>
          </div>

          <div className="shrink-0 w-full md:w-auto rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-zinc-700 text-xs space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-400 block">
              Execution Portfolio Status
            </span>
            <div className="text-lg font-black text-emerald-600 dark:text-emerald-400">
              {savedIdeas.length > 0 ? `${savedIdeas.length} Active Ventures` : 'Ready to Plan'}
            </div>
            <p className="text-[11px] text-zinc-500">
              {totalCompletedTasksCount} Milestones Completed
            </p>
          </div>

        </div>

        {/* Bio */}
        {userProfile.bio && (
          <div className="mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-800">
            <h3 className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-400 mb-1">
              Founder Vision
            </h3>
            <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
              "{userProfile.bio}"
            </p>
          </div>
        )}
      </div>

      {/* Account Settings Preferences Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 text-xs">
            <span>Preferred Sector</span>
            <Building2 className="h-4 w-4 text-amber-500" />
          </div>
          <div className="mt-2 text-base font-bold text-zinc-900 dark:text-zinc-100 truncate">
            {userProfile.preferredCategory || 'Manufacturing'}
          </div>
          <p className="text-[11px] text-zinc-400 mt-1">Default Business Domain</p>
        </div>

        <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 text-xs">
            <span>Currency</span>
            <Coins className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-base font-bold text-zinc-900 dark:text-zinc-100">
            {CURRENCY_CONFIG[currency]?.label || 'INR (₹)'}
          </div>
          <p className="text-[11px] text-zinc-400 mt-1">Feasibility Calculation Unit</p>
        </div>

        <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 text-xs">
            <span>Language</span>
            <Globe className="h-4 w-4 text-indigo-500" />
          </div>
          <div className="mt-2 text-base font-bold text-zinc-900 dark:text-zinc-100">
            {userProfile.language || 'English'}
          </div>
          <p className="text-[11px] text-zinc-400 mt-1">System Display Language</p>
        </div>

        <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 text-xs">
            <span>Milestones Progress</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-xl font-black text-zinc-900 dark:text-zinc-100">
            {totalCompletedTasksCount} <span className="text-xs font-normal text-zinc-400">/ {totalTasksCount}</span>
          </div>
          <p className="text-[11px] text-zinc-400 mt-1">{overallProgressPercent}% Completion Rate</p>
        </div>
      </div>

      {/* Active Saved Roadmaps Quick View */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Bookmark className="h-5 w-5 text-emerald-600" />
            <span>My Active Saved Ventures ({savedIdeas.length})</span>
          </h2>

          <Link
            to="/saved"
            className="text-xs font-semibold text-emerald-600 hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {savedIdeas.length > 0 ? (
          <div className="space-y-3">
            {savedIdeas.map((saved) => {
              const idea = getOrCreateBusinessIdea(saved.ideaId);
              const totalTasks = idea.launchTasks.length;
              const completedCount = idea.launchTasks.filter((t) =>
                isTaskCompleted(idea.id, t.id, t.completed)
              ).length;
              const percent = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

              return (
                <div
                  key={idea.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-zinc-100 bg-zinc-50/60 p-4 dark:border-zinc-800 dark:bg-zinc-800/40"
                >
                  <div>
                    <Link
                      to={`/roadmap/${idea.slug}`}
                      className="font-bold text-xs text-zinc-900 dark:text-zinc-100 hover:text-emerald-600"
                    >
                      {idea.title}
                    </Link>
                    <p className="text-[11px] text-zinc-500 mt-0.5">{idea.tagline}</p>
                  </div>

                  <div className="flex items-center gap-4 text-xs">
                    <span className="font-bold text-zinc-800 dark:text-zinc-200">
                      CapEx: {formatCurrency(idea.initialCapitalUSD, currency)}
                    </span>
                    <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      {percent}% Ready
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-xs text-zinc-500 space-y-2">
            <p>You haven't bookmarked any business roadmaps yet.</p>
            <Link
              to="/explore"
              className="inline-flex items-center gap-1 font-bold text-zinc-900 hover:text-emerald-600 dark:text-zinc-100"
            >
              <Compass className="h-4 w-4" />
              <span>Browse Ideas Directory</span>
            </Link>
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/60 p-4 backdrop-blur-xs overflow-y-auto">
          <div className="relative my-8 w-full max-w-2xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-zinc-100 pb-4 dark:border-zinc-800">
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <Edit3 className="h-5 w-5 text-emerald-600" />
                <span>Edit Profile & Preferences</span>
              </h3>
              <button
                onClick={() => setIsEditing(false)}
                className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              
              {/* Profile Photo Upload */}
              <div>
                <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                  Profile Photo
                </label>
                <div className="flex items-center gap-4">
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Avatar Preview"
                      referrerPolicy="no-referrer"
                      className="h-16 w-16 rounded-2xl object-cover ring-2 ring-emerald-500/40"
                    />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400 font-bold text-lg">
                      <User className="h-7 w-7" />
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handlePhotoUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-xs font-semibold text-zinc-800 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
                    >
                      <Camera className="h-3.5 w-3.5" />
                      <span>{photoPreview ? 'Change Photo' : 'Upload Photo'}</span>
                    </button>

                    {photoPreview && (
                      <button
                        type="button"
                        onClick={handleRemovePhoto}
                        className="inline-flex items-center gap-1 rounded-xl border border-rose-200 bg-white px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:border-rose-900/50 dark:bg-zinc-800 dark:text-rose-400"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Remove</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-zinc-200 bg-white p-2.5 font-medium text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:text-white"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl border border-zinc-200 bg-white p-2.5 font-medium text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:text-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone Number */}
                <div>
                  <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full rounded-xl border border-zinc-200 bg-white p-2.5 font-medium text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:text-white dark:placeholder-zinc-500"
                  />
                </div>

                {/* Occupation / Role */}
                <div>
                  <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Occupation / Role
                  </label>
                  <input
                    type="text"
                    value={formData.occupation}
                    onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                    placeholder="e.g. Founder & CEO"
                    className="w-full rounded-xl border border-zinc-200 bg-white p-2.5 font-medium text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:text-white dark:placeholder-zinc-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* University */}
                <div>
                  <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    University / Institution
                  </label>
                  <input
                    type="text"
                    value={formData.university}
                    onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                    placeholder="e.g. IIT Bombay / SR University"
                    className="w-full rounded-xl border border-zinc-200 bg-white p-2.5 font-medium text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:text-white dark:placeholder-zinc-500"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Hyderabad, India"
                    className="w-full rounded-xl border border-zinc-200 bg-white p-2.5 font-medium text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:text-white dark:placeholder-zinc-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Preferred Category */}
                <div>
                  <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Preferred Business Category
                  </label>
                  <select
                    value={formData.preferredCategory}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        preferredCategory: e.target.value as BusinessCategory,
                      })
                    }
                    className="w-full rounded-xl border border-zinc-200 bg-white p-2.5 font-medium text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Currency */}
                <div>
                  <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Display Currency
                  </label>
                  <select
                    value={formData.currency}
                    onChange={(e) =>
                      setFormData({ ...formData, currency: e.target.value as CurrencyCode })
                    }
                    className="w-full rounded-xl border border-zinc-200 bg-white p-2.5 font-medium text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                  >
                    {Object.keys(CURRENCY_CONFIG).map((code) => (
                      <option key={code} value={code}>
                        {CURRENCY_CONFIG[code as CurrencyCode].label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Founder Bio & Mission Statement
                </label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Share a brief overview of your business goals and focus..."
                  className="w-full rounded-xl border border-zinc-200 bg-white p-2.5 font-medium text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-900 px-5 py-2 text-xs font-bold text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-all shadow-xs"
                >
                  <Save className="h-3.5 w-3.5" />
                  <span>Save Profile</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
