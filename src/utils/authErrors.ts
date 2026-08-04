import { FirebaseError } from 'firebase/app';

export interface AuthErrorDetails {
  code: string;
  message: string;
  isUnauthorizedDomain: boolean;
  domain: string;
  suggestedAction?: string;
  stepsToFix?: string[];
}

export function getCurrentDomain(): string {
  if (typeof window !== 'undefined' && window.location) {
    return window.location.host; // e.g. ais-dev-wipz7gtnmctdbfu7ryrpit-686313328858.asia-east1.run.app
  }
  return '';
}

export function isStudioPreviewEnvironment(): boolean {
  if (typeof window === 'undefined') return false;
  const host = window.location.hostname;
  return host.endsWith('.run.app') || host.includes('ais-dev') || host.includes('ais-pre');
}

export function parseAuthError(err: any): AuthErrorDetails {
  const domain = getCurrentDomain();
  
  if (err instanceof FirebaseError || (err && typeof err.code === 'string')) {
    const code = err.code;

    switch (code) {
      case 'auth/unauthorized-domain':
        return {
          code,
          domain,
          isUnauthorizedDomain: true,
          message: `The current web address (${domain}) is not authorized for Google Sign-In in your Firebase Console.`,
          suggestedAction: 'Add this domain to Authorized Domains in Firebase Console or use Email/Password / Guest mode.',
          stepsToFix: [
            'Go to Firebase Console (console.firebase.google.com).',
            'Select your project.',
            'Navigate to Authentication → Settings → Authorized Domains.',
            `Click "Add Domain" and enter: ${domain}`,
            'Click Save. Google Sign-In will work immediately on this URL.'
          ]
        };

      case 'auth/popup-blocked':
        return {
          code,
          domain,
          isUnauthorizedDomain: false,
          message: 'The sign-in popup was blocked by your browser settings.',
          suggestedAction: 'Please allow popups for this site in your browser address bar or log in with Email & Password.'
        };

      case 'auth/popup-closed-by-user':
        return {
          code,
          domain,
          isUnauthorizedDomain: false,
          message: 'Sign in was cancelled before completing.',
          suggestedAction: 'Click "Continue with Google" again when ready.'
        };

      case 'auth/network-request-failed':
        return {
          code,
          domain,
          isUnauthorizedDomain: false,
          message: 'Network connection error. Unable to reach Firebase authentication servers.',
          suggestedAction: 'Check your internet connection and try again.'
        };

      case 'auth/invalid-credential':
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return {
          code,
          domain,
          isUnauthorizedDomain: false,
          message: 'Invalid email or password.',
          suggestedAction: 'Please verify your credentials or click "Forgot Password?" to reset your password.'
        };

      case 'auth/email-already-in-use':
        return {
          code,
          domain,
          isUnauthorizedDomain: false,
          message: 'An account with this email address already exists.',
          suggestedAction: 'Please log in with your existing account or reset your password if forgotten.'
        };

      case 'auth/weak-password':
        return {
          code,
          domain,
          isUnauthorizedDomain: false,
          message: 'Password is too weak.',
          suggestedAction: 'Please use a password with at least 6 characters.'
        };

      case 'auth/too-many-requests':
        return {
          code,
          domain,
          isUnauthorizedDomain: false,
          message: 'Too many failed attempts. Access temporarily restricted.',
          suggestedAction: 'Please wait a few minutes before trying again or reset your password.'
        };

      case 'auth/operation-not-allowed':
        return {
          code,
          domain,
          isUnauthorizedDomain: false,
          message: 'This authentication provider is not enabled in Firebase Console.',
          suggestedAction: 'Enable Email/Password or Google Sign-In in Firebase Console under Authentication → Sign-in method.'
        };

      case 'auth/account-exists-with-different-credential':
        return {
          code,
          domain,
          isUnauthorizedDomain: false,
          message: 'An account already exists with the same email address using a different sign-in provider.',
          suggestedAction: 'Try logging in using Email & Password.'
        };

      case 'auth/user-disabled':
        return {
          code,
          domain,
          isUnauthorizedDomain: false,
          message: 'This user account has been disabled.',
          suggestedAction: 'Please contact support for assistance.'
        };

      case 'unavailable':
      case 'failed-precondition':
        return {
          code,
          domain,
          isUnauthorizedDomain: false,
          message: 'Unable to connect to database server. Operating in offline mode.',
          suggestedAction: 'Check your internet connection or continue in Guest mode.'
        };
      case 'auth/internal-error':
        if (err?.message && err.message.toLowerCase().includes('database is closing')) {
          return {
            code,
            domain,
            isUnauthorizedDomain: false,
            message: 'Google Sign-In is blocked in this preview window due to browser storage restrictions.',
            suggestedAction: 'Please click the "Open in new tab" icon (top right) or use Email & Password sign-in.'
          };
        }
        return {
          code,
          domain,
          isUnauthorizedDomain: false,
          message: err.message || 'An internal authentication error occurred.',
          suggestedAction: 'Please try again.'
        };

      default:
        if (typeof err?.message === 'string') {
          const msg = err.message.toLowerCase();
          if (msg.includes('database is closing') || msg.includes('hidden') || msg.includes('indexeddb')) {
            return {
              code: code || 'auth/internal-error',
              domain,
              isUnauthorizedDomain: false,
              message: 'Google Sign-In is blocked in this preview window due to browser storage restrictions.',
              suggestedAction: 'Please click the "Open in new tab" icon (top right) or use Email & Password sign-in.'
            };
          }
          if (msg.includes('offline')) {
            return {
              code: code || 'offline',
              domain,
              isUnauthorizedDomain: false,
              message: 'Client is currently offline.',
              suggestedAction: 'Please check your internet connection or continue as Guest.'
            };
          }
        }
        return {
          code,
          domain,
          isUnauthorizedDomain: false,
          message: err.message || 'An authentication error occurred. Please try again.',
          suggestedAction: 'Try again or sign in with Email & Password.'
        };
    }
  }

  return {
    code: 'unknown',
    domain,
    isUnauthorizedDomain: false,
    message: typeof err === 'string' ? err : 'An unexpected error occurred during authentication.',
    suggestedAction: 'Please try again.'
  };
}
