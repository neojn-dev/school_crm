# Layout Structure Documentation

This document explains the layout organization in this Next.js application.

## Overview

This application uses Next.js App Router with multiple layouts to provide different UI structures for different types of pages.

## Layout Hierarchy

```
app/
├── layout.tsx                          # 🌍 ROOT LAYOUT (Global)
├── page.tsx                           # 🏠 Home Page (Public Landing)
├── (authenticated-app)/               # 🔐 Protected App Pages
│   ├── layout.tsx                     # 📱 APP LAYOUT (Sidebar + Navigation)
│   ├── dashboard/page.tsx             # Dashboard
│   ├── mydata/page.tsx                # Data Management
│   ├── role1/page.tsx                 # Role 1 Features
│   ├── role2/page.tsx                 # Role 2 Features
│   ├── role3/page.tsx                 # Role 3 Features
│   └── all-roles/page.tsx             # All Roles Overview
├── (public-website)/                  # 🌐 Public Marketing Pages
│   ├── layout.tsx                     # 🏢 WEBSITE LAYOUT (Header + Footer)
│   ├── company/                       # Company Pages
│   ├── services/                      # Services Pages
│   └── resources/                     # Resources Pages
└── auth/                              # 🔑 Authentication Pages
    ├── signin/page.tsx                # Sign In
    ├── signup/page.tsx                # Sign Up
    ├── forgot-password/page.tsx       # Password Reset
    └── verify/page.tsx                # Email Verification
```

## Layout Details

### 1. 🌍 ROOT LAYOUT (`app/layout.tsx`)
**Purpose**: Global layout for the entire application
**Applies to**: ALL pages
**Provides**:
- HTML structure (`<html>`, `<body>`)
- Global CSS imports
- Font configuration (Inter)
- Session provider for authentication
- Toast notifications (React-Toastify)
- Global metadata and SEO

### 2. 📱 APP LAYOUT (`app/(authenticated-app)/layout.tsx`)
**Purpose**: Layout for authenticated application pages
**Applies to**: Protected app pages (`/dashboard`, `/mydata`, `/role1`, etc.)
**Provides**:
- Beautiful collapsible sidebar navigation
- Mobile-responsive hamburger menu
- User session management
- Navigation links to app features
- Website home button
- Logout functionality
- Professional app-like interface

**Features**:
- ✨ Smooth CSS transitions
- 📱 Mobile-first responsive design
- 🎨 Modern gradient styling
- 🔄 Collapsible sidebar (320px ↔ 80px)
- 🍔 Mobile overlay menu

### 3. 🏢 WEBSITE LAYOUT (`app/(public-website)/layout.tsx`)
**Purpose**: Layout for public marketing pages
**Applies to**: Public content pages (`/company/*`, `/services/*`, `/resources/*`)
**Provides**:
- Simple header with branding
- Clean footer with copyright
- Minimal structure for content

**Note**: Currently not actively used since we have a unified home page approach, but kept for future expansion.

## Route Groups Explained

### `(authenticated-app)`
- **Purpose**: Groups all protected application pages
- **Authentication**: Required (middleware protected)
- **Layout**: App layout with sidebar
- **User Experience**: Full application interface

### `(public-website)`
- **Purpose**: Groups public marketing and informational pages
- **Authentication**: Not required
- **Layout**: Simple website layout
- **User Experience**: Marketing/content focused

## Page Routing

| URL | Layout Used | Description |
|-----|-------------|-------------|
| `/` | Root only | Public landing page with Header/Footer components |
| `/` | Root only | Public landing page with Header/Footer components |
| `/dashboard` | Root + App | Main application dashboard |
| `/mydata` | Root + App | Data management interface |
| `/role1`, `/role2`, `/role3` | Root + App | Role-specific features |
| `/all-roles` | Root + App | All roles overview |
| `/company/about` | Root + Website | Company information |
| `/services/overview` | Root + Website | Services information |
| `/auth/signin` | Root only | Authentication pages |

## Navigation Flow

1. **Unauthenticated Users**:
   - Land on `/` (public landing page)
   - See Header with Sign In/Sign Up buttons
   - Can browse public content

2. **Authenticated Users**:
   - Land on `/` (same landing page)
   - See Header with user dropdown → "Go to Application"
   - Click to enter `/dashboard` (app layout with sidebar)
   - Navigate within app using sidebar

## Best Practices

### When to Use Each Layout

- **Root Layout**: Always present, handles global concerns
- **App Layout**: Use for authenticated, feature-rich pages
- **Website Layout**: Use for public content pages (company info, blog, etc.)

### Adding New Pages

1. **New App Feature**: Add to `(authenticated-app)/` directory
2. **New Public Content**: Add to `(public-website)/` directory  
3. **New Auth Flow**: Add to `auth/` directory (uses root layout only)

### Layout Modifications

- **Global changes**: Modify `app/layout.tsx`
- **App navigation**: Modify `app/(authenticated-app)/layout.tsx`
- **Public pages**: Modify `app/(public-website)/layout.tsx`

## File Naming Convention

- ✅ `layout.tsx` - Required name for Next.js layouts
- ✅ `page.tsx` - Required name for Next.js pages
- ✅ `(group-name)/` - Route groups (don't affect URL)
- ✅ Descriptive route group names for clarity

## Component Organization

- ✅ `components/website-components/` - Header, Footer, Sidebar components
- ✅ `components/ui/` - Reusable UI components (buttons, cards, etc.)
- ✅ `components/providers/` - Context providers (session, etc.)

**Note**: The `components/website-components/` folder contains reusable components that are NOT Next.js layouts. These are regular React components used across different pages.

## URL Structure

### **Old Structure (Deprecated):**
- ❌ `/pages/all-roles` - Old dashboard route
- ❌ `/pages/mydata` - Old data management route
- ❌ `/pages/*` - Old page prefix pattern

### **New Structure (Current):**
- ✅ `/` - Public landing page
- ✅ `/dashboard` - Main application dashboard
- ✅ `/mydata` - Data management interface
- ✅ `/role1`, `/role2`, `/role3` - Role-specific features
- ✅ `/all-roles` - All roles overview
- ✅ `/company/*` - Company information pages
- ✅ `/services/*` - Services information pages
- ✅ `/resources/*` - Resources and support pages
- ✅ `/auth/*` - Authentication pages

### **Redirects After Sign In:**
- **Success**: Users are redirected to `/dashboard` (not `/pages/all-roles`)
- **Consistent**: All internal navigation uses the new structure
- **Clean URLs**: No more `/pages/` prefix confusion

## Troubleshooting

### Common Issues

1. **Layout not applying**: Check if page is in correct route group
2. **Sidebar not showing**: Ensure page is in `(authenticated-app)` group
3. **Styling conflicts**: Check layout hierarchy and CSS specificity
4. **Authentication issues**: Verify middleware configuration

### DOM Manipulation Errors

#### **Error**: "Failed to execute 'removeChild' on 'Node'"

**Causes**:
- Complex Framer Motion animations during navigation
- Session state changes causing unexpected component unmounting
- Multiple motion components conflicting across pages

**Solutions Applied**:
- ✅ **Replaced motion components** with CSS transitions
- ✅ **Added route-based keys** to force clean re-renders
- ✅ **Added loading states** to prevent premature rendering
- ✅ **Simplified animations** to avoid DOM conflicts
- ✅ **Added Error Boundary** to catch and handle any remaining errors
- ✅ **Added navigation states** to prevent error flashes during route changes
- ✅ **Increased transition delay** to 100ms for smoother DOM transitions

**Prevention**:
- Use CSS transitions instead of complex JavaScript animations
- Add proper loading states for authentication
- Use route-based keys for layout components
- Avoid staggered animations during navigation

### Debug Tips

- Use browser dev tools to inspect layout hierarchy
- Check Next.js route matching in browser network tab
- Verify route group parentheses syntax
- Ensure layout.tsx files are properly named
