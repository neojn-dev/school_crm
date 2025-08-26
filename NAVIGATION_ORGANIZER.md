# 🧭 Navigation Organizer

A powerful drag-and-drop interface for managing your website's navigation structure directly from the CMS.

## ✨ Features

### 🎯 **Drag & Drop Ordering**
- Reorder navigation items by dragging and dropping
- Visual feedback during drag operations
- Automatic sort order management

### 📄 **Page-Based Navigation**
- Automatically sync with published CMS pages
- Add/remove pages from navigation with one click
- Only published pages are available for navigation

### 👁️ **Visibility Control**
- Toggle navigation items on/off without deleting them
- Hidden items remain in the system but don't appear in the header
- Visual indicators for active/inactive items

### 🔄 **Real-Time Updates**
- Changes apply immediately to the website header
- No server restart required
- Automatic refresh of navigation data

## 🚀 How to Use

### Access the Navigation Organizer
1. Go to **Admin Panel** → **CMS** → **Pages**
2. Click on the **"Navigation"** tab
3. You'll see two panels: Available Pages and Navigation Structure

### Adding Pages to Navigation
1. **Available Pages Panel** (Left): Shows all published pages not yet in navigation
2. Click the **"Add"** button next to any page to add it to navigation
3. The page will appear in the Navigation Structure panel

### Organizing Navigation Order
1. **Navigation Structure Panel** (Right): Shows current navigation items
2. **Drag and drop** items to reorder them
3. The order here determines the order in your website header
4. Click **"Save Order"** to apply changes

### Managing Visibility
- **Toggle Switch**: Turn navigation items on/off
- **Eye Icon**: 
  - 👁️ Green = Visible in navigation
  - 👁️‍🗨️ Gray = Hidden from navigation
- Hidden items stay in your list but don't appear on the website

### Removing Items
- Click the **trash icon** 🗑️ to remove items from navigation
- This doesn't delete the page, just removes it from navigation
- Removed pages will appear back in the Available Pages panel

## 🎨 Interface Overview

```
┌─────────────────────┬─────────────────────┐
│   Available Pages   │ Navigation Structure │
│                     │                     │
│ 📄 About Us    [Add]│ ≡ Home         👁️ 🗑️│
│ 📄 Services   [Add]│ ≡ About        👁️ 🗑️│
│ 📄 Contact    [Add]│ ≡ Services     👁️ 🗑️│
│                     │ ≡ Blog         👁️ 🗑️│
└─────────────────────┴─────────────────────┘
                    [Save Order]
```

## 🔧 Technical Details

### API Endpoints
- `GET /api/cms/navigation` - Fetch navigation items
- `POST /api/cms/navigation` - Add new navigation item
- `PUT /api/cms/navigation/[id]` - Update navigation item
- `DELETE /api/cms/navigation/[id]` - Remove navigation item
- `PUT /api/cms/navigation/reorder` - Update sort orders

### Database Structure
Navigation items are stored with:
- `sortOrder`: Determines display order
- `isActive`: Controls visibility
- `pageId`: Links to CMS pages
- `label`: Display text (defaults to page title)

### Automatic Sync
- Only **published** pages appear in Available Pages
- Navigation automatically updates when pages are published/unpublished
- Changes reflect immediately in the website header

## 💡 Best Practices

### Navigation Structure
1. **Keep it simple**: 5-7 main navigation items work best
2. **Logical order**: Put most important pages first
3. **Clear labels**: Use descriptive page titles

### Page Management
1. **Publish first**: Only published pages can be added to navigation
2. **Test visibility**: Use the toggle to temporarily hide items
3. **Regular cleanup**: Remove outdated pages from navigation

### Performance
1. **Save order**: Click "Save Order" after reordering for best performance
2. **Batch changes**: Make multiple changes before saving
3. **Refresh data**: Use the refresh button if data seems outdated

## 🎯 Use Cases

### Website Launch
1. Create your main pages (Home, About, Services, Contact)
2. Publish all pages
3. Add them to navigation in logical order
4. Set homepage in Site Settings

### Content Updates
1. Create new pages as needed
2. Add them to navigation when ready
3. Reorder to maintain logical flow
4. Hide seasonal/temporary pages when not needed

### Navigation Restructuring
1. Use drag & drop to test different orders
2. Hide items temporarily while reorganizing
3. Save when you're happy with the structure
4. Monitor website header to confirm changes

## 🔍 Troubleshooting

### Page Not Showing in Available Pages
- ✅ Check if page is published
- ✅ Check if page is already in navigation
- ✅ Refresh the data using the refresh button

### Changes Not Appearing on Website
- ✅ Click "Save Order" after making changes
- ✅ Hard refresh your browser (Ctrl+F5 / Cmd+Shift+R)
- ✅ Check if navigation item is set to active (eye icon)

### Drag & Drop Not Working
- ✅ Make sure you're dragging from the grip handle (≡)
- ✅ Try refreshing the page
- ✅ Check browser console for JavaScript errors

## 🚀 Future Enhancements

Planned features for future versions:
- **Nested navigation** (dropdown menus)
- **External link support** (links to other websites)
- **Custom navigation labels** (different from page titles)
- **Navigation templates** (save/load navigation structures)
- **Bulk operations** (select multiple items)

---

**Need help?** Check the CMS documentation or contact your development team.
