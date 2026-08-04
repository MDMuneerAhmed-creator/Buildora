const fs = require('fs');
let content = fs.readFileSync('src/utils/authErrors.ts', 'utf8');

const replacement = `      default:
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
        return {`;

const parts = content.split('      default:\n        if (typeof err?.message === \'string\' && err.message.toLowerCase().includes(\'offline\')) {\n          return {\n            code: code || \'offline\',\n            domain,\n            isUnauthorizedDomain: false,\n            message: \'Client is currently offline.\',\n            suggestedAction: \'Please check your internet connection or continue as Guest.\'\n          };\n        }\n        return {');
if (parts.length > 1) {
    fs.writeFileSync('src/utils/authErrors.ts', parts[0] + replacement + parts[1]);
    console.log("Success");
} else {
    console.log("Could not find part");
}
