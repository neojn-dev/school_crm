# 🌳 Hierarchical Navigation System

A powerful multi-level navigation organizer that supports up to 4 levels of nesting with section headers, drag-and-drop organization, and homepage selection.

## ✨ Features

### 🎯 **Multi-Level Navigation (Up to 4 Levels)**
- **Level 1**: Main navigation items
- **Level 2**: Dropdown sections and pages
- **Level 3**: Sub-sections and nested pages
- **Level 4**: Deep nested pages

### 📋 **Navigation Item Types**
1. **Homepage** - Special selector for site homepage
2. **Page** - Links to CMS pages
3. **Section Header** - Organizes pages into groups (can contain sub-items)
4. **External Link** - Links to external websites

### 🎨 **Advanced Organization**
- **Drag & Drop** reordering at all levels
- **Section Headers** to group related pages
- **Nested Sections** for complex hierarchies
- **Visibility Control** (show/hide items)
- **Homepage Selector** separate from navigation

## 🚀 How to Use

### Access the Navigation Organizer
1. Go to **Admin Panel** → **CMS** → **Pages**
2. Click on the **"Navigation"** tab
3. You'll see three main areas:
   - **Homepage Settings** (left)
   - **Navigation Structure** (right)
   - **Add Item** controls (top)

### Setting Up Homepage
1. **Homepage Selector**: Choose which page serves as your website homepage
2. This is separate from navigation - homepage doesn't appear in the nav menu
3. The homepage is accessible at the root URL (`/`)

### Adding Navigation Items

#### Adding a Page
1. Click **"Add Item"** button
2. Select **"Page"** as item type
3. Choose from published pages
4. Item will be added to navigation with the page title

#### Adding a Section Header
1. Click **"Add Item"** button
2. Select **"Section Header"** as item type
3. Enter a custom section name (e.g., "Products", "Services", "About Us")
4. Section headers can contain nested items

#### Adding Nested Items
1. Find a section header in the navigation structure
2. Click the **"+"** button next to the section
3. Choose to add either a page or another section header
4. Items can be nested up to 4 levels deep

### Organizing Navigation Structure

#### Drag & Drop Reordering
1. **Grab Handle**: Use the grip icon (≡) to drag items
2. **Reorder**: Drag items up/down to change order
3. **Save Order**: Click "Save Order" to apply changes

#### Expanding/Collapsing Sections
1. **Expand**: Click the chevron (▶) to see nested items
2. **Collapse**: Click the chevron (▼) to hide nested items
3. Visual organization helps manage complex structures

#### Visibility Control
1. **Toggle Switch**: Turn items on/off
2. **Eye Icon**: 
   - 👁️ Green = Visible in navigation
   - 👁️‍🗨️ Gray = Hidden from navigation
3. Hidden items remain in structure but don't appear on website

#### Removing Items
1. **Trash Icon**: Click 🗑️ to remove items
2. **Confirmation**: System prevents removing sections with children
3. **Safe Removal**: Pages aren't deleted, just removed from navigation

## 🎨 Navigation Structure Examples

### Simple Navigation
```
Home (homepage - not in nav)
├── About
├── Services  
├── Contact
```

### Complex Hierarchical Navigation
```
Home (homepage - not in nav)
├── About
│   ├── Our Story
│   ├── Team
│   └── Careers
├── Products [Section]
│   ├── Software [Section]
│   │   ├── Web Apps
│   │   └── Mobile Apps
│   └── Hardware [Section]
│       ├── Devices
│       └── Accessories
├── Services [Section]
│   ├── Consulting
│   ├── Support
│   └── Training
└── Contact
```

### E-commerce Navigation
```
Home (homepage)
├── Shop [Section]
│   ├── Categories [Section]
│   │   ├── Electronics
│   │   ├── Clothing
│   │   └── Books
│   ├── Brands [Section]
│   │   ├── Apple
│   │   ├── Samsung
│   │   └── Nike
│   └── Sale Items
├── About [Section]
│   ├── Our Story
│   ├── Mission
│   └── Team
└── Support [Section]
    ├── FAQ
    ├── Contact
    └── Returns
```

## 🔧 Technical Implementation

### Database Structure
- **Hierarchical Relations**: Uses `parentId` to create tree structure
- **Sort Order**: `sortOrder` field maintains custom ordering
- **Depth Validation**: Prevents nesting beyond 4 levels
- **Type System**: Supports page, section, external, homepage types

### API Endpoints
- `GET /api/cms/navigation` - Fetch hierarchical navigation
- `POST /api/cms/navigation` - Add navigation items (with depth validation)
- `PUT /api/cms/navigation/[id]` - Update items (visibility, labels, etc.)
- `DELETE /api/cms/navigation/[id]` - Remove items (prevents orphaning)
- `PUT /api/cms/navigation/reorder` - Save drag-and-drop order

### Frontend Rendering
- **Desktop**: Multi-level dropdown menus with hover effects
- **Mobile**: Collapsible accordion-style navigation
- **Performance**: Lazy loading and smooth animations
- **Accessibility**: Keyboard navigation and screen reader support

## 🎯 Use Cases

### Corporate Website
```
Home
├── About [Section]
│   ├── Company History
│   ├── Leadership Team
│   ├── Mission & Values
│   └── Careers
├── Services [Section]
│   ├── Consulting [Section]
│   │   ├── Strategy
│   │   ├── Implementation
│   │   └── Training
│   └── Support [Section]
│       ├── 24/7 Help Desk
│       ├── Documentation
│       └── Community Forum
├── Industries [Section]
│   ├── Healthcare
│   ├── Finance
│   ├── Education
│   └── Government
└── Contact
```

### Educational Institution
```
Home
├── Academics [Section]
│   ├── Programs [Section]
│   │   ├── Undergraduate
│   │   ├── Graduate
│   │   └── Continuing Education
│   ├── Departments [Section]
│   │   ├── Engineering
│   │   ├── Business
│   │   └── Liberal Arts
│   └── Academic Calendar
├── Admissions [Section]
│   ├── Apply Now
│   ├── Requirements
│   ├── Financial Aid
│   └── Visit Campus
├── Student Life [Section]
│   ├── Housing
│   ├── Activities
│   └── Support Services
└── About [Section]
    ├── History
    ├── Leadership
    └── Campus
```

### SaaS Platform
```
Home
├── Product [Section]
│   ├── Features [Section]
│   │   ├── Core Features
│   │   ├── Advanced Tools
│   │   └── Integrations
│   ├── Pricing
│   └── Demo
├── Solutions [Section]
│   ├── By Industry [Section]
│   │   ├── E-commerce
│   │   ├── Healthcare
│   │   └── Education
│   └── By Use Case [Section]
│       ├── Marketing
│       ├── Sales
│       └── Support
├── Resources [Section]
│   ├── Documentation
│   ├── API Reference
│   ├── Tutorials
│   └── Blog
└── Support
```

## 💡 Best Practices

### Navigation Design
1. **Keep it Logical**: Group related items together
2. **Limit Depth**: Use 2-3 levels for most sites, 4 levels maximum
3. **Clear Labels**: Use descriptive, action-oriented labels
4. **Consistent Structure**: Maintain similar patterns across sections

### Content Organization
1. **Section Headers**: Use for grouping 3+ related pages
2. **Alphabetical Order**: Consider for large lists (products, locations)
3. **Priority Order**: Put most important items first
4. **User Journey**: Organize by user goals and tasks

### Performance Optimization
1. **Batch Changes**: Make multiple edits before saving order
2. **Regular Cleanup**: Remove unused items periodically
3. **Test Navigation**: Verify all levels work on mobile and desktop
4. **Monitor Usage**: Track which navigation items are most used

### Accessibility
1. **Keyboard Navigation**: Ensure all levels are keyboard accessible
2. **Screen Readers**: Use descriptive labels and proper ARIA attributes
3. **Mobile Friendly**: Test collapsible navigation on various devices
4. **Visual Hierarchy**: Use consistent styling for different levels

## 🔍 Troubleshooting

### Common Issues

#### "Maximum nesting depth exceeded"
- **Cause**: Trying to add items beyond 4 levels
- **Solution**: Reorganize structure or move items to higher levels

#### "Cannot delete section with children"
- **Cause**: Attempting to remove section that contains nested items
- **Solution**: Remove or move child items first, then delete section

#### Changes not appearing on website
- **Cause**: Forgot to save order or browser cache
- **Solution**: Click "Save Order" and hard refresh browser

#### Drag and drop not working
- **Cause**: Browser compatibility or JavaScript errors
- **Solution**: Use grip handle (≡), check browser console for errors

### Performance Issues

#### Slow navigation loading
- **Cause**: Too many navigation items or complex nesting
- **Solution**: Simplify structure, use fewer top-level items

#### Mobile navigation problems
- **Cause**: Deep nesting on small screens
- **Solution**: Consider separate mobile navigation structure

## 🚀 Advanced Features

### Planned Enhancements
- **Custom Icons**: Add icons to navigation items
- **External Links**: Support for external website links
- **Navigation Templates**: Save and reuse navigation structures
- **A/B Testing**: Test different navigation layouts
- **Analytics Integration**: Track navigation usage patterns

### Custom Styling
- **CSS Classes**: Each navigation level has specific CSS classes
- **Theme Support**: Easily customize colors and spacing
- **Animation Control**: Adjust hover and transition effects
- **Responsive Breakpoints**: Customize mobile/desktop behavior

---

**Need Help?** The hierarchical navigation system is designed to be intuitive, but if you need assistance, check the CMS documentation or contact your development team.
