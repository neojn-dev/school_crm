# Drag & Drop Page Builder

A comprehensive, fully functional drag-and-drop page builder built with React, Next.js, and @hello-pangea/dnd. This system allows users to create beautiful, responsive web pages by simply dragging components from a library and dropping them onto the canvas.

## 🚀 Features

### Core Functionality
- **Drag & Drop Interface**: Intuitive drag-and-drop from component library to canvas
- **Nested Containers**: Support for container blocks that can hold child components
- **Real-time Preview**: See changes instantly as you build
- **Responsive Design**: All components are fully responsive
- **Undo/Redo**: Full history management with undo/redo functionality
- **Visual Feedback**: Clear visual indicators during drag operations

### Component Library
- **70+ Pre-built Components**: Comprehensive library of ready-to-use blocks
- **Categorized Organization**: Components organized by type (Layout, Content, Media, etc.)
- **Search & Filter**: Find components quickly with search and category filters
- **Drag from Library**: Direct drag from library to canvas
- **Quick Add Buttons**: One-click addition of common components

### Customization
- **Live Customization Panel**: Real-time editing of component properties
- **Content Editing**: Edit text, images, links, and other content
- **Style Controls**: Customize colors, spacing, typography, and layout
- **Settings Panel**: Advanced configuration options for each component
- **Visual Property Editor**: User-friendly interface for all customizations

### Advanced Features
- **Block Structure Tree**: Hierarchical view of page structure
- **Viewport Modes**: Preview in desktop, tablet, and mobile views
- **Export/Import**: Save and load page configurations as JSON
- **Placeholder Content**: Rich placeholder content with high-quality images
- **Drop Zones**: Clear visual indicators for valid drop targets
- **Block Duplication**: Clone existing blocks with all settings

## 🏗️ Architecture

### Component Structure
```
components/cms/page-builder/
├── drag-drop-page-builder.tsx     # Main page builder component
├── draggable-block-library.tsx    # Component library with drag support
├── drop-zone.tsx                  # Visual drop zone indicators
├── block-customization-panel.tsx  # Real-time customization panel
├── block-renderer.tsx             # Component rendering system
└── page-builder.tsx               # Enhanced original page builder
```

### Block System
Each block follows a consistent structure:
```typescript
interface PageBlock {
  id: string              // Unique identifier
  type: string           // Block type (hero, features, etc.)
  component: string      // Component name for rendering
  content: any          // Block content (text, images, etc.)
  settings: any         // Display and behavior settings
  children?: PageBlock[] // Child blocks for containers
  parentId?: string     // Parent block ID for nested blocks
}
```

### Drag & Drop Flow
1. **Drag Start**: User drags component from library or existing block
2. **Drag Over**: Visual feedback shows valid drop zones
3. **Drop**: Component is added/moved to target location
4. **Update**: Page structure is updated and history is recorded

## 🎨 Component Categories

### Layout & Structure (📐)
- **Hero Section**: Prominent header with title, description, and CTAs
- **Container**: Wrapper with customizable width and styling
- **Section**: Full-width section with background options
- **Columns**: Multi-column responsive layouts
- **Card**: Container cards with various styling options
- **Spacer**: Vertical spacing control
- **Divider**: Visual content separators

### Advanced Layout (🏗️)
- **CSS Grid**: Advanced grid layouts with drag-drop positioning
- **Flexbox**: Flexible layouts with alignment controls
- **Masonry**: Pinterest-style dynamic layouts
- **Sticky Elements**: Scroll-triggered sticky positioning
- **Floating Elements**: Action buttons and floating content

### Navigation (🧭)
- **Navigation Bar**: Responsive navigation with dropdowns
- **Breadcrumbs**: Hierarchical navigation
- **Pagination**: Multi-page content navigation
- **Tag Cloud**: Interactive content categorization

### Typography (📝)
- **Headings**: Customizable headings with animations
- **Paragraphs**: Rich text with formatting options
- **Quotes**: Stylized quotes and testimonials
- **Lists**: Customizable bullet and numbered lists
- **Callouts**: Highlighted information boxes

### Content (📄)
- **Features Section**: Showcase key features with icons
- **Testimonials**: Customer testimonials with ratings
- **FAQ Accordion**: Collapsible question/answer sections
- **Pricing Tables**: Comparison tables with features

### Media (🖼️)
- **Images**: Responsive images with styling options
- **Videos**: Video players with embed support
- **Galleries**: Multi-image galleries with layouts
- **Icons**: Customizable icon displays
- **Carousels**: Interactive content sliders

### Interactive (⚡)
- **Tabs**: Tabbed content organization
- **Accordions**: Collapsible content sections
- **Modals**: Dialog boxes and overlays
- **Tooltips**: Contextual information displays
- **Progress Bars**: Animated progress indicators

### E-commerce (🛒)
- **Product Cards**: Product displays with actions
- **Pricing Tables**: Feature comparison tables
- **Shopping Cart**: Cart management interface

### Forms (📋)
- **Contact Forms**: Customizable contact forms
- **Newsletter Signup**: Email subscription forms
- **Rating Systems**: Star rating displays
- **Polls**: Interactive voting components

### Call to Action (🎯)
- **Buttons**: Customizable action buttons
- **CTA Sections**: Full-width conversion sections
- **Banners**: Notification and promotional banners
- **Countdown Timers**: Event and promotion timers

## 🎯 Usage Examples

### Basic Usage
```tsx
import { DragDropPageBuilder } from '@/components/cms/page-builder/drag-drop-page-builder'

function MyPageBuilder() {
  const [blocks, setBlocks] = useState([])
  
  const handleSave = (newBlocks) => {
    setBlocks(newBlocks)
    // Save to database
  }
  
  return (
    <DragDropPageBuilder
      initialBlocks={blocks}
      onSave={handleSave}
    />
  )
}
```

### With Initial Content
```tsx
const initialBlocks = [
  {
    id: "hero-1",
    type: "hero",
    component: "HeroBlock",
    content: {
      title: "Welcome to My Site",
      description: "Build amazing pages with drag & drop"
    },
    settings: {}
  }
]

<DragDropPageBuilder
  initialBlocks={initialBlocks}
  onSave={handleSave}
/>
```

### Preview Mode
```tsx
<DragDropPageBuilder
  initialBlocks={blocks}
  isPreview={true}
/>
```

## 🛠️ Customization

### Adding New Block Types
1. Create the block component in `components/cms/blocks/`
2. Add configuration to `allBlockConfigs` in `blocks/index.ts`
3. Include in `blockRegistry` for dynamic loading
4. Add to appropriate category

### Custom Styling
The page builder uses Tailwind CSS classes and can be customized through:
- CSS custom properties
- Tailwind configuration
- Component-level styling
- Theme customization

### Extending Functionality
- Add new drag sources beyond the component library
- Implement custom drop zones
- Create specialized container types
- Add advanced validation rules

## 📱 Responsive Design

The page builder includes built-in responsive features:
- **Viewport Preview**: Switch between desktop, tablet, and mobile views
- **Responsive Components**: All blocks adapt to different screen sizes
- **Mobile-First**: Components designed with mobile-first approach
- **Breakpoint Controls**: Customize behavior at different breakpoints

## 🔧 Configuration

### Environment Setup
Ensure you have the required dependencies:
```json
{
  "@hello-pangea/dnd": "^18.0.1",
  "lucide-react": "^0.307.0",
  "react": "^18",
  "next": "^15.5.0"
}
```

### Placeholder Content
High-quality placeholder content is provided through:
- Unsplash images for visual appeal
- Realistic text content
- Professional examples
- Industry-standard layouts

## 🚀 Performance

### Optimization Features
- **Lazy Loading**: Components loaded on demand
- **Dynamic Imports**: Reduced initial bundle size
- **Memoization**: Optimized re-rendering
- **Efficient Updates**: Minimal DOM manipulation

### Best Practices
- Use React.memo for custom components
- Implement proper key props for lists
- Optimize images with Next.js Image component
- Minimize inline styles

## 🧪 Testing

The page builder can be tested at `/cms/page-builder-demo` which includes:
- Sample content demonstration
- All component categories
- Drag & drop functionality
- Export/import capabilities
- Responsive preview modes

## 🔮 Future Enhancements

Potential improvements and additions:
- **Multi-page Support**: Manage multiple pages
- **Template Library**: Pre-built page templates
- **Version Control**: Page version management
- **Collaboration**: Multi-user editing
- **Advanced Animations**: Motion and transition controls
- **SEO Tools**: Built-in SEO optimization
- **A/B Testing**: Variant testing capabilities
- **Analytics Integration**: Usage tracking and insights

## 📄 License

This drag & drop page builder is part of the Next.js template project and follows the same licensing terms.

---

**Built with ❤️ using React, Next.js, and modern web technologies.**
