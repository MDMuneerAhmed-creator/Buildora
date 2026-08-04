import React, { createContext, useContext, useState, useEffect } from 'react';
import { CurrencyCode } from '../utils/formatters';
import { SavedRoadmapState, UserProfile } from '../types';
import { ChatMessage } from '../utils/exportCopilotPdf';
import {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  GoogleAuthProvider,
  signInWithPopup,
  doc,
  getDoc,
  setDoc,
  onSnapshot,
} from '../lib/firebase';
import { FirebaseError } from 'firebase/app';
import { parseAuthError, AuthErrorDetails } from '../utils/authErrors';

export interface AuthResult {
  success: boolean;
  message?: string;
  errorDetails?: AuthErrorDetails;
}

interface RoadmapContextType {
  // Auth state
  currentUser: UserProfile | null;
  isAuthenticated: boolean;
  isGuest: boolean;
  authLoading: boolean;
  signup: (fullName: string, email: string, password: string) => Promise<AuthResult>;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<AuthResult>;
  loginWithGoogle: () => Promise<AuthResult>;
  continueAsGuest: () => void;
  logout: () => Promise<void>;
  updateUserProfile: (profile: Partial<UserProfile>) => Promise<void>;

  // App data state
  currency: CurrencyCode;
  savedIdeas: SavedRoadmapState[];
  toggleSaveIdea: (ideaId: string) => void;
  isIdeaSaved: (ideaId: string) => boolean;
  compareList: string[];
  toggleCompare: (ideaId: string) => void;
  isIdeaInCompare: (ideaId: string) => boolean;
  clearCompare: () => void;
  toggleTaskCompleted: (ideaId: string, taskId: string) => void;
  isTaskCompleted: (ideaId: string, taskId: string, defaultCompleted?: boolean) => boolean;
  recentSearches: string[];
  addRecentSearch: (query: string) => void;

  // Copilot history state & saver
  copilotHistory: ChatMessage[];
  saveCopilotHistory: (messages: ChatMessage[]) => void;

  // Legacy accessor for components
  userProfile: UserProfile;
}

const GUEST_PROFILE: UserProfile = {
  id: 'guest_session',
  name: 'Guest Founder',
  email: 'guest@buildora.ai',
  university: 'Buildora Incubator',
  occupation: 'Guest Entrepreneur',
  location: 'Guest Workspace',
  bio: 'Exploring feasibility roadmaps and business execution plans as a guest user.',
  preferredCategory: 'Manufacturing',
  currency: 'INR',
  language: 'English',
  joinedDate: 'Guest Mode',
  isGuest: true,
};

const DEFAULT_COMPARE: string[] = [];
const DEFAULT_SEARCHES = ['Bamboo Toothbrush', 'Cold Pressed Juice', 'Solar Cleaning Drone'];

const RoadmapContext = createContext<RoadmapContextType | undefined>(undefined);

export const RoadmapProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Per-User App Data State
  const [savedIdeas, setSavedIdeas] = useState<SavedRoadmapState[]>([]);
  const [compareList, setCompareList] = useState<string[]>(DEFAULT_COMPARE);
  const [completedTasksMap, setCompletedTasksMap] = useState<Record<string, string[]>>({});
  const [recentSearches, setRecentSearches] = useState<string[]>(DEFAULT_SEARCHES);
  const [copilotHistory, setCopilotHistory] = useState<ChatMessage[]>([]);

  // 1. Firebase Auth state listener + Guest fallback
  useEffect(() => {
    let unsubDoc: (() => void) | null = null;

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('[RoadmapContext] onAuthStateChanged fired:', { uid: firebaseUser?.uid });
      
      // Clean up previous user document listener if any
      if (unsubDoc) {
        unsubDoc();
        unsubDoc = null;
      }

      if (firebaseUser) {
        // User is logged in via Firebase Auth
        
        // Optimistically set a basic profile to unblock the UI instantly,
        // avoiding long loading spinners on slow networks.
        setCurrentUser({
          id: firebaseUser.uid,
          name: firebaseUser.displayName || 'Founder',
          email: firebaseUser.email || '',
          university: '',
          occupation: 'Founder',
          location: 'India',
          bio: 'Building scalable, sustainable ventures with Buildora AI.',
          preferredCategory: 'Manufacturing',
          currency: 'INR',
          language: 'English',
          joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          isGuest: false,
        });
        
        setAuthLoading(false); // <--- Unblock UI immediately
        const userDocRef = doc(db, 'users', firebaseUser.uid);

        // Listen to Firestore document for real-time syncing across devices
        unsubDoc = onSnapshot(
          userDocRef,
          (snapshot) => {
            console.log('[RoadmapContext] onSnapshot received data:', { exists: snapshot.exists() });
            if (snapshot.exists()) {
              const data = snapshot.data();
              const profile: UserProfile = data.profile || {
                id: firebaseUser.uid,
                name: firebaseUser.displayName || 'Founder',
                email: firebaseUser.email || '',
                university: '',
                occupation: 'Founder',
                location: 'India',
                bio: 'Building scalable, sustainable ventures with Buildora AI.',
                preferredCategory: 'Manufacturing',
                currency: 'INR',
                language: 'English',
                joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
                isGuest: false,
              };

              setCurrentUser(profile);
              setSavedIdeas(data.savedIdeas || []);
              setCompareList(data.compareList || DEFAULT_COMPARE);
              setCompletedTasksMap(data.completedTasksMap || {});
              setRecentSearches(data.recentSearches || DEFAULT_SEARCHES);
              setCopilotHistory(data.copilotHistory || []);
            } else {
              // Document doesn't exist yet, create default profile doc
              const initialProfile: UserProfile = {
                id: firebaseUser.uid,
                name: firebaseUser.displayName || 'Founder',
                email: firebaseUser.email || '',
                university: '',
                occupation: 'Founder',
                location: 'India',
                bio: 'Building scalable, sustainable ventures with Buildora AI.',
                preferredCategory: 'Manufacturing',
                currency: 'INR',
                language: 'English',
                joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
                isGuest: false,
              };

              setDoc(
                userDocRef,
                {
                  profile: initialProfile,
                  savedIdeas: [],
                  compareList: DEFAULT_COMPARE,
                  completedTasksMap: {},
                  recentSearches: DEFAULT_SEARCHES,
                  copilotHistory: [],
                  updatedAt: new Date().toISOString(),
                },
                { merge: true }
              ).catch(() => {});

              setCurrentUser(initialProfile);
            }
          },
          (err) => {
            console.warn('Error reading user Firestore document (using fallback auth profile):', err);
            if (auth.currentUser) {
              const fallbackProfile: UserProfile = {
                id: firebaseUser.uid,
                name: firebaseUser.displayName || 'Founder',
                email: firebaseUser.email || '',
                university: '',
                occupation: 'Founder',
                location: 'India',
                bio: 'Building scalable, sustainable ventures with Buildora AI.',
                preferredCategory: 'Manufacturing',
                currency: 'INR',
                language: 'English',
                joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
                isGuest: false,
              };
              setCurrentUser((prev) => prev || fallbackProfile);
            }
          }
        );

        localStorage.removeItem('buildora_guest_session');
        setAuthLoading(false);
      } else {
        console.log('[RoadmapContext] No firebase user, defaulting to guest mode');
        localStorage.setItem('buildora_guest_session', 'true');
        setCurrentUser(GUEST_PROFILE);
        try {
          const guestSaved = localStorage.getItem('buildora_guest_saved_ideas');
          setSavedIdeas(guestSaved ? JSON.parse(guestSaved) : []);
          const guestCompare = localStorage.getItem('buildora_guest_compare_list');
          setCompareList(guestCompare ? JSON.parse(guestCompare) : DEFAULT_COMPARE);
          const guestTasks = localStorage.getItem('buildora_guest_completed_tasks');
          setCompletedTasksMap(guestTasks ? JSON.parse(guestTasks) : {});
          const guestSearches = localStorage.getItem('buildora_guest_recent_searches');
          setRecentSearches(guestSearches ? JSON.parse(guestSearches) : DEFAULT_SEARCHES);
          const guestChat = localStorage.getItem('buildora_guest_chat');
          setCopilotHistory(guestChat ? JSON.parse(guestChat) : []);
        } catch {
          // fallback defaults
        }
        setAuthLoading(false);
      }
    });

    return () => {
      if (unsubDoc) unsubDoc();
      unsubscribe();
    };
  }, []);

  // Sync Guest data to localStorage when in guest mode
  useEffect(() => {
    if (currentUser?.isGuest) {
      localStorage.setItem('buildora_guest_saved_ideas', JSON.stringify(savedIdeas));
      localStorage.setItem('buildora_guest_compare_list', JSON.stringify(compareList));
      localStorage.setItem('buildora_guest_completed_tasks', JSON.stringify(completedTasksMap));
      localStorage.setItem('buildora_guest_recent_searches', JSON.stringify(recentSearches));
      localStorage.setItem('buildora_guest_chat', JSON.stringify(copilotHistory));
    }
  }, [currentUser?.isGuest, savedIdeas, compareList, completedTasksMap, recentSearches, copilotHistory]);

  // Auth Methods
  const signup = async (fullName: string, email: string, password: string): Promise<AuthResult> => {
    const cleanEmail = email.trim().toLowerCase();
    if (!fullName.trim() || !cleanEmail || !password) {
      return { success: false, message: 'Please complete all required fields.' };
    }

    try {
      console.log('[Signup] Calling createUserWithEmailAndPassword');
      const userCredential = await createUserWithEmailAndPassword(auth, cleanEmail, password);
      const uid = userCredential.user.uid;
      console.log('[Signup] createUserWithEmailAndPassword complete, uid:', uid);

      if (auth.currentUser) {
        console.log('[Signup] Calling updateProfile');
        await updateProfile(auth.currentUser, { displayName: fullName.trim() });
        console.log('[Signup] updateProfile complete');
      }

      const initialProfile: UserProfile = {
        id: uid,
        name: fullName.trim(),
        email: cleanEmail,
        university: '',
        occupation: 'Founder',
        location: 'India',
        bio: 'Building scalable, sustainable ventures with Buildora AI.',
        preferredCategory: 'Manufacturing',
        currency: 'INR',
        language: 'English',
        joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        isGuest: false,
      };

      console.log('[Signup] Calling setDoc');
      // Execute in background to prevent UI freeze
      setDoc(doc(db, 'users', uid), {
        profile: initialProfile,
        savedIdeas: [],
        compareList: DEFAULT_COMPARE,
        completedTasksMap: {},
        recentSearches: DEFAULT_SEARCHES,
        copilotHistory: [],
        updatedAt: new Date().toISOString(),
      }).catch(err => console.error('[Signup] setDoc error:', err));
      console.log('[Signup] setDoc dispatched');

      localStorage.removeItem('buildora_guest_session');
      setAuthLoading(false);
      setCurrentUser(initialProfile);
      
      // Reset loading if necessary, though navigate will handle it
      return { success: true };
    } catch (err: any) {
      setAuthLoading(false);
      const parsed = parseAuthError(err);
      if (parsed.code !== 'auth/email-already-in-use' && parsed.code !== 'auth/invalid-email' && parsed.code !== 'auth/weak-password') {
        console.error('Firebase Signup Error:', err);
      }
      return { success: false, message: parsed.message, errorDetails: parsed };
    }
  };

  const login = async (email: string, password: string, rememberMe = true): Promise<AuthResult> => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !password) {
      return { success: false, message: 'Please enter both email and password.' };
    }

    try {
      setAuthLoading(true);
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
      await signInWithEmailAndPassword(auth, cleanEmail, password);
      
      localStorage.removeItem('buildora_guest_session');
      setAuthLoading(false);
      return { success: true };
    } catch (err: any) {
      setAuthLoading(false);
      const parsed = parseAuthError(err);
      if (
        parsed.code !== 'auth/user-not-found' &&
        parsed.code !== 'auth/wrong-password' &&
        parsed.code !== 'auth/invalid-credential' &&
        parsed.code !== 'auth/invalid-email'
      ) {
        console.error('Firebase Login Error:', err);
      }
      return { success: false, message: parsed.message, errorDetails: parsed };
    }
  };

  const loginWithGoogle = async (): Promise<AuthResult> => {
    try {
      setAuthLoading(true);
      
      // Explicitly set persistence to wake up IndexedDB before popup
      try {
        await setPersistence(auth, browserLocalPersistence);
      } catch (pErr) {
        console.warn('Could not set persistence before Google login', pErr);
      }

      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account',
      });
      
      let userCredential;
      try {
        userCredential = await signInWithPopup(auth, provider);
      } catch (innerErr: any) {
        // Retry once if we hit the IndexedDB/Database is closing issue common in iframes
        if (innerErr?.message && (innerErr.message.toLowerCase().includes('database is closing') || innerErr.message.toLowerCase().includes('hidden') || innerErr.message.toLowerCase().includes('indexeddb'))) {
          console.log("Retrying Google sign-in due to IndexedDB closure error...");
          // Try with session persistence instead if local fails
          await setPersistence(auth, browserSessionPersistence).catch(()=>{});
          userCredential = await signInWithPopup(auth, provider);
        } else {
          throw innerErr;
        }
      }
      
      const user = userCredential.user;

      const initialProfile: UserProfile = {
        id: user.uid,
        name: user.displayName || 'Founder',
        email: user.email || '',
        university: '',
        occupation: 'Founder',
        location: 'India',
        bio: 'Building scalable, sustainable ventures with Buildora AI.',
        preferredCategory: 'Manufacturing',
        currency: 'INR',
        language: 'English',
        joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        isGuest: false,
      };

      const userDocRef = doc(db, 'users', user.uid);
      setDoc(
        userDocRef,
        {
          profile: initialProfile,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      ).catch(() => {});

      setCurrentUser(initialProfile);

      localStorage.removeItem('buildora_guest_session');
      setAuthLoading(false);
      return { success: true };
    } catch (err: any) {
      setAuthLoading(false);
      const parsed = parseAuthError(err);
      if (parsed.code !== 'auth/popup-closed-by-user') {
        console.error('Google Sign-In Error:', err);
      }
      return { success: false, message: parsed.message, errorDetails: parsed };
    }
  };

  const continueAsGuest = () => {
    localStorage.setItem('buildora_guest_session', 'true');
    if (auth.currentUser) {
      signOut(auth).catch((err) => console.error('Error signing out:', err));
    }
    setCurrentUser(GUEST_PROFILE);
  };

  const logout = async () => {
    localStorage.setItem('buildora_guest_session', 'true');
    setAuthLoading(false);
    setCurrentUser(GUEST_PROFILE);
    try {
      const guestSaved = localStorage.getItem('buildora_guest_saved_ideas');
      setSavedIdeas(guestSaved ? JSON.parse(guestSaved) : []);
      const guestCompare = localStorage.getItem('buildora_guest_compare_list');
      setCompareList(guestCompare ? JSON.parse(guestCompare) : DEFAULT_COMPARE);
      const guestTasks = localStorage.getItem('buildora_guest_completed_tasks');
      setCompletedTasksMap(guestTasks ? JSON.parse(guestTasks) : {});
      const guestSearches = localStorage.getItem('buildora_guest_recent_searches');
      setRecentSearches(guestSearches ? JSON.parse(guestSearches) : DEFAULT_SEARCHES);
      const guestChat = localStorage.getItem('buildora_guest_chat');
      setCopilotHistory(guestChat ? JSON.parse(guestChat) : []);
    } catch {
      // fallback
    }

    try {
      if (auth.currentUser) {
        await signOut(auth);
      }
    } catch (err) {
      console.error('Error signing out of Firebase:', err);
    }
  };

  const updateUserProfile = async (updatedFields: Partial<UserProfile>) => {
    if (!currentUser) return;

    const updated = { ...currentUser, ...updatedFields };
    setCurrentUser(updated);

    if (!currentUser.isGuest && auth.currentUser) {
      try {
        await setDoc(
          doc(db, 'users', auth.currentUser.uid),
          {
            profile: updated,
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        );
      } catch (err) {
        console.error('Error updating user profile in Firestore:', err);
      }
    }
  };

  // Feature Actions with Firestore + LocalStorage sync
  const toggleSaveIdea = (ideaId: string) => {
    setSavedIdeas((prev) => {
      const exists = prev.some((item) => item.ideaId === ideaId);
      const next = exists
        ? prev.filter((item) => item.ideaId !== ideaId)
        : [...prev, { ideaId, savedAt: new Date().toISOString(), completedTasks: [] }];

      if (auth.currentUser && !currentUser?.isGuest) {
        setDoc(
          doc(db, 'users', auth.currentUser.uid),
          {
            savedIdeas: next,
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        ).catch((err) => console.error('Firestore save error:', err));
      }
      return next;
    });
  };

  const isIdeaSaved = (ideaId: string) => savedIdeas.some((item) => item.ideaId === ideaId);

  const toggleCompare = (ideaId: string) => {
    setCompareList((prev) => {
      let next: string[];
      if (prev.includes(ideaId)) {
        next = prev.filter((id) => id !== ideaId);
      } else {
        if (prev.length >= 3) {
          next = [...prev.slice(1), ideaId];
        } else {
          next = [...prev, ideaId];
        }
      }

      if (auth.currentUser && !currentUser?.isGuest) {
        setDoc(
          doc(db, 'users', auth.currentUser.uid),
          {
            compareList: next,
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        ).catch((err) => console.error('Firestore compare error:', err));
      }
      return next;
    });
  };

  const isIdeaInCompare = (ideaId: string) => compareList.includes(ideaId);

  const clearCompare = () => {
    setCompareList([]);
    if (auth.currentUser && !currentUser?.isGuest) {
      setDoc(
        doc(db, 'users', auth.currentUser.uid),
        {
          compareList: [],
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      ).catch((err) => console.error('Firestore clear compare error:', err));
    }
  };

  const toggleTaskCompleted = (ideaId: string, taskId: string) => {
    setCompletedTasksMap((prev) => {
      const ideaTasks = prev[ideaId] || [];
      const updatedTasks = ideaTasks.includes(taskId)
        ? ideaTasks.filter((id) => id !== taskId)
        : [...ideaTasks, taskId];
      const nextMap = { ...prev, [ideaId]: updatedTasks };

      if (auth.currentUser && !currentUser?.isGuest) {
        setDoc(
          doc(db, 'users', auth.currentUser.uid),
          {
            completedTasksMap: nextMap,
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        ).catch((err) => console.error('Firestore task completed error:', err));
      }
      return nextMap;
    });
  };

  const isTaskCompleted = (ideaId: string, taskId: string, defaultCompleted?: boolean) => {
    const ideaTasks = completedTasksMap[ideaId];
    if (ideaTasks !== undefined) {
      return ideaTasks.includes(taskId);
    }
    return !!defaultCompleted;
  };

  const addRecentSearch = (query: string) => {
    if (!query.trim()) return;
    setRecentSearches((prev) => {
      const filtered = prev.filter((q) => q.toLowerCase() !== query.toLowerCase());
      const next = [query.trim(), ...filtered].slice(0, 6);

      if (auth.currentUser && !currentUser?.isGuest) {
        setDoc(
          doc(db, 'users', auth.currentUser.uid),
          {
            recentSearches: next,
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        ).catch((err) => console.error('Firestore search error:', err));
      }
      return next;
    });
  };

  const saveCopilotHistory = (messages: ChatMessage[]) => {
    setCopilotHistory(messages);
    if (auth.currentUser && !currentUser?.isGuest) {
      // Remove undefined values to prevent Firestore errors
      const cleanMessages = messages.map(msg => {
        const cleanMsg = { ...msg };
        Object.keys(cleanMsg).forEach(key => {
          if ((cleanMsg as any)[key] === undefined) {
            delete (cleanMsg as any)[key];
          }
        });
        return cleanMsg;
      });

      setDoc(
        doc(db, 'users', auth.currentUser.uid),
        {
          copilotHistory: cleanMessages,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      ).catch((err) => console.error('Firestore copilot history error:', err));
    }
  };

  const userProfile = currentUser || GUEST_PROFILE;
  const currency: CurrencyCode = currentUser?.currency || 'INR';

  return (
    <RoadmapContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        isGuest: !!currentUser?.isGuest,
        authLoading,
        signup,
        login,
        loginWithGoogle,
        continueAsGuest,
        logout,
        updateUserProfile,
        currency,
        savedIdeas,
        toggleSaveIdea,
        isIdeaSaved,
        compareList,
        toggleCompare,
        isIdeaInCompare,
        clearCompare,
        toggleTaskCompleted,
        isTaskCompleted,
        recentSearches,
        addRecentSearch,
        copilotHistory,
        saveCopilotHistory,
        userProfile,
      }}
    >
      {children}
    </RoadmapContext.Provider>
  );
};

export const useRoadmap = () => {
  const context = useContext(RoadmapContext);
  if (!context) {
    throw new Error('useRoadmap must be used within a RoadmapProvider');
  }
  return context;
};
