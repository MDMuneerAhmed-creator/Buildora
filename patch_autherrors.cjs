const fs = require('fs');
let content = fs.readFileSync('src/utils/authErrors.ts', 'utf8');

const replacement = `      case 'unavailable':
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
        };`;

const parts = content.split('      case \'unavailable\':\n      case \'failed-precondition\':');
if (parts.length > 1) {
    const after = parts[1].split('        return {\n          code,\n          domain,\n          isUnauthorizedDomain: false,\n          message: \'Unable to connect to database server. Operating in offline mode.\',\n          suggestedAction: \'Check your internet connection or continue in Guest mode.\'\n        };')[1];
    fs.writeFileSync('src/utils/authErrors.ts', parts[0] + replacement + after);
    console.log("Success");
} else {
    console.log("Could not find part");
}
