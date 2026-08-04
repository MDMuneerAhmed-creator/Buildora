const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const replacement = `    <!-- Suppress benign Vite WebSocket errors and iframe IndexedDB errors -->
    <script>
      window.addEventListener('unhandledrejection', function(event) {
        if (event.reason && event.reason.message) {
          const msg = event.reason.message.toLowerCase();
          if (msg.includes('websocket') || msg.includes('database is closing') || msg.includes('indexeddb') || msg.includes('hidden')) {
            event.preventDefault();
          }
        }
      });
    </script>`;

content = content.replace(/    <!-- Suppress benign Vite WebSocket errors caused by Buildora environment HMR disabled state -->\n    <script>[\s\S]*?<\/script>/, replacement);
fs.writeFileSync('index.html', content);
