# 🔍 Debugging Guide for Data Loading Issues

This guide explains the comprehensive logging and debugging features I've added to help troubleshoot why the data isn't being displayed in the tables for doctors, engineers, lawyers, and teachers.

## 🚀 What I've Added

### 1. **Enhanced Console Logging**
- **Session Status Tracking**: Logs when user authentication status changes
- **API Request Logging**: Detailed logging of all API calls and responses
- **Data Flow Tracking**: Logs when data is fetched, processed, and stored in state
- **Error Handling**: Comprehensive error logging with stack traces

### 2. **Debug Panels on Each Page**
Each page now has a development-only debug panel that shows:
- Current session status
- Loading state
- Data count
- Any errors that occurred
- Raw debug information
- Database test results

### 3. **Database Connection Testing**
- New `/api/test-db` endpoint to test database connectivity
- Tests all table counts and sample data retrieval
- Helps identify if the issue is with the database or the frontend

### 4. **Enhanced Error Handling**
- Better error messages displayed to users
- Retry buttons when data loading fails
- Graceful fallbacks when data is malformed

## 🔧 How to Use the Debugging Features

### **Step 1: Open Browser Developer Tools**
1. Navigate to any of the pages (doctors, engineers, lawyers, teachers)
2. Press `F12` or right-click → "Inspect" → "Console" tab
3. Look for logs starting with `🔍 [DEBUG]` and `❌ [ERROR]`

### **Step 2: Check the Debug Panel**
1. Look for the orange debug panel below the stats cards
2. Check the session status, loading state, and data count
3. Use the "Log State to Console" button to see current state
4. Use the "Test Database" button to test database connectivity

### **Step 3: Monitor Console Logs**
Watch for these key log patterns:

```
🔍 [DEBUG] Session status changed: loading
🔍 [DEBUG] User authenticated, fetching doctors...
🔍 [DEBUG] Making API request to /api/doctors
🔍 [API DEBUG] GET /api/doctors called
🔍 [API DEBUG] User authenticated: user@example.com
🔍 [API DEBUG] Found doctors count: 0
```

## 🐛 Common Issues to Look For

### **1. Authentication Issues**
- **Symptoms**: Session status shows "unauthenticated" or "loading"
- **Check**: Look for session-related logs in console
- **Solution**: Ensure user is properly logged in

### **2. Database Connection Issues**
- **Symptoms**: API calls fail with 500 errors
- **Check**: Use "Test Database" button in debug panel
- **Solution**: Check database connection string and Prisma setup

### **3. Empty Data Sets**
- **Symptoms**: Count shows 0, no error messages
- **Check**: Look for "Found doctors count: 0" in API logs
- **Solution**: Check if seed data exists, run database seeding

### **4. API Route Issues**
- **Symptoms**: Frontend shows loading indefinitely
- **Check**: Look for API request/response logs
- **Solution**: Check API route implementation and middleware

## 📊 Debug Panel Information

The debug panel shows real-time information about:

- **Session Status**: Current authentication state
- **Loading State**: Whether data is being fetched
- **Data Count**: Number of records loaded
- **Error Messages**: Any errors that occurred
- **Raw Data**: Complete debug information object
- **Database Test Results**: Results from database connectivity tests

## 🗄️ Database Testing

The "Test Database" button will:

1. Test Prisma connection
2. Count records in all tables
3. Retrieve sample data from each table
4. Show detailed results in the debug panel

This helps identify if the issue is:
- Database connection problems
- Empty tables (no seed data)
- Permission issues
- Schema mismatches

## 🔍 What to Look For in Console

### **Successful Data Loading:**
```
🔍 [DEBUG] User authenticated, fetching doctors...
🔍 [DEBUG] Making API request to /api/doctors
🔍 [API DEBUG] Found doctors count: 10
🔍 [DEBUG] Doctors state updated with 10 records
```

### **Failed Data Loading:**
```
❌ [ERROR] API request failed: 500 - Internal server error
❌ [API ERROR] Error fetching doctors: [error details]
```

### **Authentication Issues:**
```
🔍 [DEBUG] Session status changed: unauthenticated
❌ [API DEBUG] Unauthorized - no session
```

## 🚨 Troubleshooting Steps

### **If No Data is Loading:**

1. **Check Authentication**: Ensure user is logged in
2. **Test Database**: Use the "Test Database" button
3. **Check Console**: Look for error messages
4. **Verify API Routes**: Check if `/api/doctors` etc. are accessible
5. **Check Database**: Ensure tables have data (run seed script if needed)

### **If Getting Errors:**

1. **Check Console Logs**: Look for detailed error messages
2. **Check Network Tab**: See actual HTTP responses
3. **Check Server Logs**: Look for backend error messages
4. **Test Database Connection**: Use the test endpoint

### **If Data Count is 0:**

1. **Run Database Seed**: Execute `npm run db:seed` or similar
2. **Check Database**: Verify tables exist and have data
3. **Check Permissions**: Ensure user has access to data
4. **Verify Schema**: Check if Prisma schema matches database

## 📝 Next Steps

After using these debugging features:

1. **Identify the Root Cause**: Use logs to pinpoint where the issue occurs
2. **Check Database**: Ensure tables exist and have data
3. **Verify Authentication**: Confirm user sessions are working
4. **Test API Routes**: Ensure endpoints are accessible
5. **Check Prisma**: Verify database schema and connections

## 🆘 Still Having Issues?

If the debugging doesn't reveal the problem:

1. **Check the database directly** using a database client
2. **Verify environment variables** (DATABASE_URL, etc.)
3. **Check Prisma migrations** are up to date
4. **Look at server logs** for additional error details
5. **Test with a simple query** to isolate the issue

The comprehensive logging should now give you clear visibility into exactly what's happening at each step of the data loading process!
