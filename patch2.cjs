const fs = require('fs');
let content = fs.readFileSync('src/context/RoadmapContext.tsx', 'utf8');

const replacement = `  const logout = async () => {
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
  };`;

const parts = content.split('  const logout = async () => {\n    localStorage.removeItem(\'buildora_guest_session\');');
if (parts.length > 1) {
    const after = parts[1].split('console.error(\'Error signing out of Firebase:\', err);\n    }\n  };')[1];
    fs.writeFileSync('src/context/RoadmapContext.tsx', parts[0] + replacement + after);
    console.log("Success");
} else {
    console.log("Could not find part");
}
