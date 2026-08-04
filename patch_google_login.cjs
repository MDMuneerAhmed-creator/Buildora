const fs = require('fs');
let content = fs.readFileSync('src/context/RoadmapContext.tsx', 'utf8');

const replacement = `  const loginWithGoogle = async (): Promise<AuthResult> => {
    try {
      setAuthLoading(true);
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account',
      });
      
      let userCredential;
      try {
        userCredential = await signInWithPopup(auth, provider);
      } catch (innerErr) {
        // Retry once if we hit the IndexedDB/Database is closing issue common in iframes
        if (innerErr?.message && (innerErr.message.toLowerCase().includes('database is closing') || innerErr.message.toLowerCase().includes('hidden') || innerErr.message.toLowerCase().includes('indexeddb'))) {
          console.log("Retrying Google sign-in due to IndexedDB closure error...");
          userCredential = await signInWithPopup(auth, provider);
        } else {
          throw innerErr;
        }
      }
      
      const user = userCredential.user;`;

const parts = content.split('  const loginWithGoogle = async (): Promise<AuthResult> => {\n    try {\n      setAuthLoading(true);\n      const provider = new GoogleAuthProvider();\n      provider.setCustomParameters({\n        prompt: \'select_account\',\n      });\n      const userCredential = await signInWithPopup(auth, provider);\n      const user = userCredential.user;');

if (parts.length > 1) {
    fs.writeFileSync('src/context/RoadmapContext.tsx', parts[0] + replacement + parts[1]);
    console.log("Success");
} else {
    console.log("Could not find part");
}
