# Website Components

This folder contains reusable header and footer components for different contexts in your application.

## Components Overview

### 🏢 **App Components** (For Authenticated App)
- **`AppHeader`** - Header for authenticated app pages (dashboard, doctors, engineers, lawyers, teachers)
- **`AppFooter`** - Footer for authenticated app pages

### 🌐 **Website Components** (For Public Website)
- **`WebsiteHeader`** - Header for public website pages (company, services, resources)
- **`WebsiteFooter`** - Footer for public website pages

### 📚 **Legacy Components** (Kept for backward compatibility)
- **`Header`** - Original header component
- **`Footer`** - Original footer component
- **`Sidebar`** - Sidebar navigation component

## Usage Examples

### For Authenticated App Pages (Current Implementation)

The authenticated app now uses a **hybrid approach** with both sidebar navigation and header/footer:

```tsx
// The layout automatically includes:
// - AppHeader at the top
// - Sidebar navigation on the left
// - AppFooter at the bottom
// - Your page content in the main area

// No need to manually import - it's all handled in the layout
export default function AuthenticatedPage() {
  return (
    <div>
      {/* Your page content */}
      {/* Header, sidebar, and footer are automatically included */}
    </div>
  )
}
```

### For Public Website Pages

```tsx
// In your public website layout or pages
import { WebsiteHeader, WebsiteFooter } from "@/components/website-components"

export default function PublicPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <WebsiteHeader />
      <main className="flex-1">
        {/* Your page content */}
      </main>
      <WebsiteFooter />
    </div>
  )
}
```

## Layout Files

### Authenticated App Layout
- **Current**: `app/(authenticated-app)/layout.tsx` - Uses sidebar navigation + AppHeader + AppFooter
- **Features**: 
  - ✅ Sidebar navigation (Dashboard, Doctors, Engineers, Lawyers, Teachers)
  - ✅ AppHeader with user profile and quick navigation
  - ✅ AppFooter with links and status
  - ✅ Mobile responsive design
  - ✅ Collapsible sidebar

### Public Website Layout
- **Current**: `app/(public-website)/layout.tsx` - Uses WebsiteHeader + WebsiteFooter

## Component Features

### AppHeader
- ✅ Navigation to Dashboard, Doctors, Engineers, Lawyers, Teachers
- ✅ User profile dropdown with sign out
- ✅ Mobile responsive with hamburger menu
- ✅ Professional admin panel styling

### AppFooter
- ✅ Company branding and copyright
- ✅ Quick links to help, privacy, terms
- ✅ System status indicators
- ✅ Version information

### WebsiteHeader
- ✅ Company branding and logo
- ✅ Dropdown navigation (Company, Services, Resources)
- ✅ Contact information display
- ✅ Authentication buttons (Sign In, Get Started)
- ✅ Mobile responsive design

### WebsiteFooter
- ✅ Company information and description
- ✅ Comprehensive link sections (Company, Services, Resources)
- ✅ Newsletter signup form
- ✅ Social media links
- ✅ Legal links and copyright
- ✅ Professional business styling

## Current Implementation

### Authenticated App
The authenticated app now provides the **best of both worlds**:

1. **AppHeader** - Professional header with user profile and quick access
2. **Sidebar** - Detailed navigation with descriptions and icons
3. **AppFooter** - Professional footer with links and status
4. **Main Content** - Your pages (doctors, engineers, lawyers, teachers)

This gives users:
- **Quick access** to main sections via the header
- **Detailed navigation** via the sidebar
- **Professional appearance** with header and footer
- **Familiar sidebar experience** for power users

### Public Website
The public website uses a clean, professional header and footer approach suitable for marketing and informational pages.

## Customization

### Branding
Update the company name, logo, and contact information in each component:

```tsx
// In WebsiteHeader.tsx and WebsiteFooter.tsx
const companyInfo = {
  name: "Your Company Name",
  description: "Your company description...",
  address: "Your address...",
  phone: "Your phone...",
  email: "Your email...",
  website: "Your website..."
}
```

### Navigation
Modify the navigation items in each header component:

```tsx
// In AppHeader.tsx
const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
  { name: 'Your Section', href: '/your-section', icon: YourIcon },
  // Add more navigation items
]
```

### Styling
All components use Tailwind CSS classes and can be customized by modifying the className props.

## Benefits

- **Best of Both Worlds**: Sidebar navigation + header/footer for authenticated app
- **Separation of Concerns**: Different headers/footers for different contexts
- **Professional Appearance**: Modern, business-appropriate styling
- **Mobile Responsive**: Works great on all device sizes
- **Consistent Design**: Unified design language across components
- **Easy Customization**: Simple to modify branding and navigation
- **Accessibility**: Proper ARIA labels and semantic HTML

## Dependencies

- Next.js 13+ with App Router
- Tailwind CSS
- Lucide React icons
- NextAuth.js (for session management)
- React Hook Form (for forms)
