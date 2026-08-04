const fs = require('fs');
let content = fs.readFileSync('src/context/RoadmapContext.tsx', 'utf8');

const replacement = `  const loginWithGoogle = async (): Promise<AuthResult> => {
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
      
      const user = userCredential.user;`;

const parts = content.split('  const loginWithGoogle = async (): Promise<AuthResult> => {\n    try {\n      setAuthLoading(true);\n      const provider = new GoogleAuthProvider();\n      provider.setCustomParameters({\n        prompt: \'select_account\',\n      });\n      \n      let userCredential;\n      try {\n        userCredential = await signInWithPopup(auth, provider);\n      } catch (innerErr) {\n        // Retry once if we hit the IndexedDB/Database is closing issue common in iframes\n        if (innerErr?.message && (innerErr.message.toLowerCase().includes(\'database is closing\') || innerErr.message.toLowerCase().includes(\'hidden\') || innerErr.message.toLowerCase().includes(\'indexeddb\'))) {\n          console.log("Retrying Google sign-in due to IndexedDB closure error...");\n          userCredential = await signInWithPopup(auth, provider);\n        } else {\n          throw innerErr;\n        }\n      }\n      \n      const user = userCredential.user;');

if (parts.length > 1) {
    fs.writeFileSync('src/context/RoadmapContext.tsx', parts[0] + replacement + parts[1]);
    console.log("Success");
} else {
    console.log("Could not find part");
}
