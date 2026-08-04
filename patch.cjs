const fs = require('fs');
let content = fs.readFileSync('src/context/RoadmapContext.tsx', 'utf8');

const replacement = `      } else {
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
    });`;

const parts = content.split('      } else {\n        console.log(\'[RoadmapContext] No firebase user, logging out\');');
if (parts.length > 1) {
    const after = parts[1].split('        setAuthLoading(false);\n      }\n    });')[1];
    fs.writeFileSync('src/context/RoadmapContext.tsx', parts[0] + replacement + after);
    console.log("Success");
} else {
    console.log("Could not find part");
}
