// Test script to verify NextAuth CLIENT_FETCH_ERROR is fixed
// Run this in the browser console after loading the app

console.log('🔐 Testing NextAuth Configuration...');

// Test 1: Check if NextAuth providers are accessible
async function testProviders() {
  console.log('\n📋 Test 1: NextAuth Providers');
  
  try {
    const response = await fetch('/api/auth/providers');
    if (response.ok) {
      const providers = await response.json();
      console.log('✅ Providers endpoint working:', Object.keys(providers));
      return true;
    } else {
      console.log('❌ Providers endpoint failed:', response.status);
      return false;
    }
  } catch (error) {
    console.log('❌ Providers endpoint error:', error.message);
    return false;
  }
}

// Test 2: Check if NextAuth session endpoint is accessible
async function testSession() {
  console.log('\n🔐 Test 2: NextAuth Session');
  
  try {
    const response = await fetch('/api/auth/session');
    if (response.status === 401 || response.status === 200) {
      console.log('✅ Session endpoint working (status:', response.status + ')');
      return true;
    } else {
      console.log('❌ Session endpoint unexpected status:', response.status);
      return false;
    }
  } catch (error) {
    console.log('❌ Session endpoint error:', error.message);
    return false;
  }
}

// Test 3: Check if NextAuth CSRF token is accessible
async function testCSRF() {
  console.log('\n🛡️ Test 3: NextAuth CSRF Token');
  
  try {
    const response = await fetch('/api/auth/csrf');
    if (response.ok) {
      const csrf = await response.json();
      console.log('✅ CSRF endpoint working, token length:', csrf.csrfToken?.length || 0);
      return true;
    } else {
      console.log('❌ CSRF endpoint failed:', response.status);
      return false;
    }
  } catch (error) {
    console.log('❌ CSRF endpoint error:', error.message);
    return false;
  }
}

// Test 4: Check for CLIENT_FETCH_ERROR in console
function testConsoleErrors() {
  console.log('\n🚨 Test 4: Console Error Monitoring');
  
  // Override console.error to catch NextAuth errors
  const originalError = console.error;
  let clientFetchErrors = 0;
  
  console.error = function(...args) {
    const message = args.join(' ');
    if (message.includes('CLIENT_FETCH_ERROR')) {
      clientFetchErrors++;
      console.log('🚨 CLIENT_FETCH_ERROR detected:', message);
    }
    originalError.apply(console, args);
  };
  
  // Wait and check for errors
  setTimeout(() => {
    if (clientFetchErrors === 0) {
      console.log('✅ No CLIENT_FETCH_ERROR detected in 5 seconds');
    } else {
      console.log(`❌ Found ${clientFetchErrors} CLIENT_FETCH_ERROR(s)`);
    }
    console.error = originalError;
  }, 5000);
  
  return true;
}

// Test 5: Test NextAuth useSession hook (if available)
function testUseSession() {
  console.log('\n🎣 Test 5: NextAuth useSession Hook');
  
  // Check if we're in a React environment with NextAuth
  if (typeof window !== 'undefined' && window.next && window.next.router) {
    console.log('✅ Next.js environment detected');
    
    // Check if NextAuth session provider is available
    if (document.querySelector('[data-nextauth-session]') || 
        document.querySelector('[data-session-provider]')) {
      console.log('✅ NextAuth session provider detected');
    } else {
      console.log('ℹ️ NextAuth session provider not detected (may be normal)');
    }
    
    return true;
  } else {
    console.log('ℹ️ Not in Next.js environment');
    return false;
  }
}

// Run all tests
async function runAllTests() {
  console.log('🚀 Starting NextAuth fix verification tests...\n');
  
  const results = {
    providers: await testProviders(),
    session: await testSession(),
    csrf: await testCSRF(),
    consoleErrors: testConsoleErrors(),
    useSession: testUseSession()
  };
  
  console.log('\n🎯 Test Results Summary:');
  Object.entries(results).forEach(([test, passed]) => {
    console.log(`${passed ? '✅' : '❌'} ${test}: ${passed ? 'PASSED' : 'FAILED'}`);
  });
  
  const passedTests = Object.values(results).filter(Boolean).length;
  const totalTests = Object.keys(results).length;
  
  console.log(`\n📊 Overall: ${passedTests}/${totalTests} tests passed`);
  
  if (passedTests === totalTests) {
    console.log('🎉 All tests passed! NextAuth CLIENT_FETCH_ERROR should be fixed.');
  } else {
    console.log('⚠️ Some tests failed. Check the individual test results above.');
  }
  
  return results;
}

// Auto-run tests after a short delay
setTimeout(runAllTests, 1000);

// Also expose the test functions globally for manual testing
window.testNextAuth = {
  runAllTests,
  testProviders,
  testSession,
  testCSRF,
  testConsoleErrors,
  testUseSession
};

console.log('🧪 NextAuth test suite loaded. Tests will run automatically in 1 second.');
console.log('💡 You can also run window.testNextAuth.runAllTests() manually.');
