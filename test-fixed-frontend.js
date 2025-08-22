// Test script to verify hydration issues are fixed
// Run this in the browser console after the fixes

console.log('🧪 Testing Hydration Fixes...');

// Test 1: Check if components are mounted properly
function testComponentMounting() {
  console.log('\n📋 Test 1: Component Mounting');
  
  // Check if header exists
  const header = document.querySelector('header');
  if (header) {
    console.log('✅ Header component mounted successfully');
  } else {
    console.log('❌ Header component not found');
  }
  
  // Check if footer exists
  const footer = document.querySelector('footer');
  if (footer) {
    console.log('✅ Footer component mounted successfully');
  } else {
    console.log('❌ Footer component not found');
  }
  
  // Check if main content exists
  const main = document.querySelector('main');
  if (main) {
    console.log('✅ Main content mounted successfully');
  } else {
    console.log('❌ Main content not found');
  }
}

// Test 2: Check for hydration warnings
function testHydrationWarnings() {
  console.log('\n⚠️ Test 2: Hydration Warnings');
  
  // Check console for hydration warnings
  const originalWarn = console.warn;
  let hydrationWarnings = 0;
  
  console.warn = function(...args) {
    const message = args.join(' ');
    if (message.includes('hydration') || message.includes('Hydration')) {
      hydrationWarnings++;
      console.log('🚨 Hydration warning detected:', message);
    }
    originalWarn.apply(console, args);
  };
  
  // Wait a bit and check
  setTimeout(() => {
    console.log(`📊 Total hydration warnings: ${hydrationWarnings}`);
    if (hydrationWarnings === 0) {
      console.log('✅ No hydration warnings detected');
    } else {
      console.log('❌ Hydration warnings detected');
    }
    console.warn = originalWarn;
  }, 1000);
}

// Test 3: Test navigation
function testNavigation() {
  console.log('\n🧭 Test 3: Navigation');
  
  // Check if sign-in link exists
  const signInLinks = document.querySelectorAll('a[href="/auth/signin"]');
  if (signInLinks.length > 0) {
    console.log(`✅ Found ${signInLinks.length} sign-in link(s)`);
    
    // Test clicking the first sign-in link
    const firstLink = signInLinks[0];
    console.log('🖱️ Testing sign-in link click...');
    
    // Simulate click
    firstLink.click();
    
    setTimeout(() => {
      if (window.location.pathname === '/auth/signin') {
        console.log('✅ Navigation to sign-in page successful');
      } else {
        console.log('❌ Navigation failed or redirected');
      }
    }, 500);
    
  } else {
    console.log('❌ No sign-in links found');
  }
}

// Test 4: Check for DOM inconsistencies
function testDOMConsistency() {
  console.log('\n🔍 Test 4: DOM Consistency');
  
  // Check for orphaned nodes
  const body = document.body;
  const children = body.children;
  
  console.log(`📊 Body has ${children.length} direct children`);
  
  // Check for any elements with missing parents
  let orphanedElements = 0;
  const allElements = document.querySelectorAll('*');
  
  allElements.forEach(element => {
    if (element.parentNode === null && element !== document.documentElement) {
      orphanedElements++;
    }
  });
  
  if (orphanedElements === 0) {
    console.log('✅ No orphaned elements detected');
  } else {
    console.log(`❌ Found ${orphanedElements} orphaned elements`);
  }
}

// Test 5: Check session state
function testSessionState() {
  console.log('\n🔐 Test 5: Session State');
  
  // Check if NextAuth session data exists
  if (window.__NEXT_AUTH_SESSION__) {
    console.log('✅ NextAuth session data available');
  } else {
    console.log('ℹ️ NextAuth session data not available (may be normal)');
  }
  
  // Check for session provider
  const sessionProvider = document.querySelector('[data-nextjs-router]');
  if (sessionProvider) {
    console.log('✅ Next.js router detected');
  } else {
    console.log('ℹ️ Next.js router not detected (may be normal)');
  }
}

// Test 6: Check for hooks errors
function testHooksErrors() {
  console.log('\n🎣 Test 6: Hooks Order');
  
  // Check console for hooks-related errors
  const originalError = console.error;
  let hooksErrors = 0;
  
  console.error = function(...args) {
    const message = args.join(' ');
    if (message.includes('Rendered more hooks') || 
        message.includes('hooks') || 
        message.includes('Hooks')) {
      hooksErrors++;
      console.log('🚨 Hooks error detected:', message);
    }
    originalError.apply(console, args);
  };
  
  // Wait a bit and check
  setTimeout(() => {
    console.log(`📊 Total hooks errors: ${hooksErrors}`);
    if (hooksErrors === 0) {
      console.log('✅ No hooks errors detected');
    } else {
      console.log('❌ Hooks errors detected');
    }
    console.error = originalError;
  }, 1000);
}

// Run all tests
function runAllTests() {
  console.log('🚀 Starting comprehensive hydration tests...\n');
  
  testComponentMounting();
  testHydrationWarnings();
  testNavigation();
  testDOMConsistency();
  testSessionState();
  testHooksErrors();
  
  console.log('\n🎯 Test suite completed!');
  console.log('\n📝 Summary:');
  console.log('- If you see mostly ✅ marks, the hydration issues are fixed');
  console.log('- If you see ❌ marks, there may still be issues');
  console.log('- Check the browser console for any error messages');
  console.log('- The hooks order issue should now be resolved');
}

// Auto-run tests after a short delay
setTimeout(runAllTests, 1000);

// Also expose the test functions globally for manual testing
window.testHydration = {
  runAllTests,
  testComponentMounting,
  testHydrationWarnings,
  testNavigation,
  testDOMConsistency,
  testSessionState,
  testHooksErrors
};

console.log('🧪 Hydration test suite loaded. Run window.testHydration.runAllTests() to test manually.');
console.log('🎣 New test added: Hooks order validation');
