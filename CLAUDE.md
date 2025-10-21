# CLAUDE.md

This file contains information for AI code agents working on this repository.

## Project Overview

This is a simple React-based personal website for Froystein Consulting Co., Ltd, hosted at https://www.froystein.jp/

The site showcases:
- Company information and services (Kubernetes and Cloud Native consultancy)
- Featured blog content from blog.froystein.jp
- Professional certifications
- Social media links (GitHub, LinkedIn)

## Technology Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Library**: Material-UI (MUI) v5
- **Styling**: Emotion (MUI's default)
- **Color Scheme**: Catppuccin Mocha palette (dark theme)
- **Icons**: Material-UI Icons and FontAwesome

## Project Structure

```
/src/
  - App.tsx          # Main application component with all page content
  - Content.tsx      # Simple component for Japanese company name
  - theme.tsx        # Custom MUI theme configuration
  - main.tsx         # React entry point
  - index.html       # HTML template
/public/
  - fc.svg           # Company logo
```

## Key Files

### App.tsx
The main component containing the entire page layout:
- Header with logo and company description
- Featured content section (blog posts)
- Certifications section
- Footer with copyright and social links

### Content.tsx
Displays the Japanese company name: フロイシュタインコンサルティング合同会社

### theme.tsx
Defines custom MUI theme using the Catppuccin Mocha color palette (https://github.com/catppuccin/palette). The theme includes all 26 Mocha colors configured for dark mode with proper background, text, and accent colors.

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

The site is deployed at https://www.froystein.jp/

## Related Sites

- Blog: https://blog.froystein.jp/
- Engineering blog: https://engineering.intility.com/

## Code Style

- TypeScript for type safety
- Material-UI components for consistent design
- Functional React components with hooks
- Simple, straightforward structure without over-engineering
