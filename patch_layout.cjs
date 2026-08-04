const fs = require('fs');
let content = fs.readFileSync('src/layouts/PublicLayout.tsx', 'utf8');
content = content.replace('if (isAuthenticated) {', 'if (isAuthenticated && !isGuest) {');
content = content.replace('const { isAuthenticated, authLoading } = useRoadmap();', 'const { isAuthenticated, isGuest, authLoading } = useRoadmap();');
fs.writeFileSync('src/layouts/PublicLayout.tsx', content);
