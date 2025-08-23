# 🐛 Server-Side Debugging Guide for Next.js

This guide explains how to debug server-side Next.js code using browser DevTools with the Node.js inspector.

## 🚀 Quick Start

### Available Debug Scripts

```bash
# Standard development (no debugging)
npm run dev

# Enable debugging (recommended for most cases)
npm run dev:debug

# Enable debugging with break on start (pauses immediately)
npm run dev:debug-brk

# Enable remote debugging (for Docker/containers)
npm run dev:debug-remote

# Enable debugging with verbose logging
npm run dev:debug-verbose

# Debug production build
npm run start:debug
```

## 🔧 Setup Instructions

### 1. Start Debug Server

Choose one of the debug scripts based on your needs:

```bash
# Most common - enables debugging
npm run dev:debug
```

You'll see output like:
```
Debugger listening on ws://127.0.0.1:9229/0cf90313-350d-4466-a748-cd60f4e47c95
For help, see: https://nodejs.org/en/docs/inspector
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

### 2. Connect Browser DevTools

#### For Chrome/Edge:
1. Open a new tab and visit `chrome://inspect`
2. Click **Configure...** to ensure debugging ports are listed
3. Add `localhost:9229` and `localhost:9230` if not present
4. Look for your Next.js application in the **Remote Target** section
5. Click **inspect** to open DevTools
6. Go to the **Sources** tab

#### For Firefox:
1. Open a new tab and visit `about:debugging`
2. Click **This Firefox** in the left sidebar
3. Under **Remote Targets**, find your Next.js application
4. Click **Inspect** to open the debugger
5. Go to the **Debugger** tab

## 🎯 Debug Script Explanations

### `dev:debug`
- **Purpose**: Standard debugging for development
- **Use Case**: General server-side debugging
- **Command**: `NODE_OPTIONS='--inspect' next dev`

### `dev:debug-brk`
- **Purpose**: Debugging with immediate breakpoint
- **Use Case**: Debug startup issues or early initialization code
- **Command**: `NODE_OPTIONS='--inspect-brk' next dev`
- **Note**: Server will pause immediately, waiting for debugger to attach

### `dev:debug-remote`
- **Purpose**: Remote debugging access
- **Use Case**: Debugging in Docker containers or remote environments
- **Command**: `NODE_OPTIONS='--inspect=0.0.0.0:9229' next dev`
- **Security**: Only use in secure environments (exposes debugging port)

### `dev:debug-verbose`
- **Purpose**: Debugging with comprehensive logging
- **Use Case**: Complex issues requiring detailed logs
- **Command**: `NODE_OPTIONS='--inspect' DEBUG=* next dev`
- **Note**: Generates extensive console output

### `start:debug`
- **Purpose**: Debug production build
- **Use Case**: Production-specific issues
- **Command**: `NODE_OPTIONS='--inspect' next start`
- **Prerequisite**: Run `npm run build` first

## 🔍 Debugging Techniques

### Setting Breakpoints

1. **In DevTools Sources Tab**:
   - Navigate to your file (use Ctrl+P/⌘+P to search)
   - Click line numbers to set breakpoints
   - Files appear as `webpack://{application-name}/./path/to/file`

2. **In Code (debugger statement)**:
   ```javascript
   // Add this line in your server-side code
   debugger;
   ```

### Common Debug Locations

#### API Routes
```javascript
// app/api/auth/signin/route.ts
export async function POST(request: Request) {
  debugger; // Breakpoint here
  const body = await request.json();
  // ... rest of your code
}
```

#### Server Components
```javascript
// app/dashboard/page.tsx
export default async function DashboardPage() {
  debugger; // Breakpoint here
  const data = await fetchData();
  return <div>{data}</div>;
}
```

#### Middleware
```javascript
// middleware.ts
export function middleware(request: NextRequest) {
  debugger; // Breakpoint here
  // ... your middleware logic
}
```

#### NextAuth Configuration
```javascript
// lib/auth.ts
export const authOptions: NextAuthOptions = {
  callbacks: {
    async jwt({ token, user }) {
      debugger; // Breakpoint here
      // ... callback logic
    }
  }
}
```

## 🛠️ Debugging Specific Issues

### Authentication Issues
```bash
# Start with verbose logging
npm run dev:debug-verbose

# Then check these files in DevTools:
# - lib/auth.ts (NextAuth configuration)
# - app/api/auth/[...nextauth]/route.ts
# - middleware.ts (route protection)
```

### Database Issues
```bash
# Debug database operations
npm run dev:debug

# Check these locations:
# - lib/db.ts (Prisma client)
# - API routes that interact with database
# - Server components that fetch data
```

### API Route Issues
```bash
# Debug API endpoints
npm run dev:debug

# Set breakpoints in:
# - app/api/*/route.ts files
# - lib/ utility functions
# - Database query functions
```

## 📊 Debug Output Examples

### Successful Debug Connection
```
Debugger listening on ws://127.0.0.1:9229/abc123...
ready - started server on 0.0.0.0:3000
```

### Debug with Breakpoint Hit
```
Debugger attached.
Waiting for the debugger to disconnect...
```

### Verbose Debug Output
```
next:server:lib:squash-cache squashing cache +0ms
next:server:lib:incremental-cache:fs writing cache file +1ms
```

## 🚨 Troubleshooting

### Port Already in Use
```bash
# Kill existing debug processes
lsof -ti:9229 | xargs kill -9

# Or use different port
NODE_OPTIONS='--inspect=9230' npm run dev
```

### DevTools Not Connecting
1. Ensure debug script is running
2. Check `chrome://inspect` configuration
3. Verify port numbers match
4. Try refreshing the Remote Targets list

### Breakpoints Not Hit
1. Verify you're debugging server-side code (not client-side)
2. Check file paths in DevTools Sources tab
3. Ensure code is actually executing (add console.log)
4. Try using `debugger;` statement instead of DevTools breakpoints

## 🎯 Best Practices

### Development Workflow
1. **Start with `dev:debug`** for general debugging
2. **Use `dev:debug-brk`** for startup issues
3. **Add `debugger;` statements** for specific breakpoints
4. **Use console.log** for quick debugging
5. **Check Network tab** for API call issues

### Performance Considerations
- **Debugging adds overhead** - don't use in production
- **Close DevTools** when not actively debugging
- **Use specific breakpoints** instead of stepping through everything

### Security Notes
- **Never use `dev:debug-remote`** in production
- **Don't commit `debugger;` statements** to production code
- **Be careful with sensitive data** in debug sessions

## 📚 Additional Resources

- [Node.js Debugging Guide](https://nodejs.org/en/docs/guides/debugging-getting-started/)
- [Chrome DevTools Documentation](https://developer.chrome.com/docs/devtools/)
- [Next.js Debugging Documentation](https://nextjs.org/docs/advanced-features/debugging)
- [VS Code Debugging Setup](https://code.visualstudio.com/docs/nodejs/nodejs-debugging)

## 🔗 Quick Links

- **Start Debugging**: `npm run dev:debug`
- **Chrome Inspector**: `chrome://inspect`
- **Firefox Debugger**: `about:debugging`
- **Kill Debug Process**: `lsof -ti:9229 | xargs kill -9`

---

Happy Debugging! 🐛✨