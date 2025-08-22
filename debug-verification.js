// Debug script to help identify hydration issues
// Run this in the browser console when the error occurs

console.log('=== Hydration Debug Info ===');

// Check if we're in the browser
if (typeof window !== 'undefined') {
  console.log('Environment: Browser');
  console.log('User Agent:', navigator.userAgent);
  console.log('URL:', window.location.href);
  
  // Check for React DevTools
  if (window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
    console.log('React DevTools: Available');
  } else {
    console.log('React DevTools: Not available');
  }
  
  // Check for Next.js specific globals
  if (window.__NEXT_DATA__) {
    console.log('Next.js Data: Available');
    console.log('Page:', window.__NEXT_DATA__.page);
    console.log('Props:', window.__NEXT_DATA__.props);
  } else {
    console.log('Next.js Data: Not available');
  }
  
  // Check for session data
  if (window.__NEXT_AUTH_SESSION__) {
    console.log('NextAuth Session: Available');
  } else {
    console.log('NextAuth Session: Not available');
  }
  
  // Check DOM state
  console.log('Body children count:', document.body.children.length);
  console.log('Root div exists:', !!document.getElementById('__next'));
  
} else {
  console.log('Environment: Server');
}

// Check for common hydration issues
console.log('\n=== Common Hydration Issues ===');
console.log('1. Server/Client mismatch in rendering');
console.log('2. Dynamic content that differs between server and client');
console.log('3. Authentication state differences');
console.log('4. Route changes during hydration');
console.log('5. Component mounting/unmounting during navigation');

// Check for specific NextAuth issues
console.log('\n=== NextAuth Specific Issues ===');
console.log('1. Session provider not wrapping correctly');
console.log('2. Authentication state changing during render');
console.log('3. Redirect happening before hydration completes');
console.log('4. Middleware conflicts with client-side routing');

console.log('\n=== Recommendations ===');
console.log('1. Check browser console for additional errors');
console.log('2. Verify session state in React DevTools');
console.log('3. Check network tab for failed requests');
console.log('4. Look for timing issues in component lifecycle');
console.log('5. Verify route group configuration');
