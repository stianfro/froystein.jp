# CLAUDE.md

This file contains information for AI code agents working on this repository.

## Project Overview

This is a static Astro website for Froystein Consulting Co., Ltd, hosted at https://www.froystein.jp/

The site showcases:
- Company information and services (Kubernetes and Cloud Native consultancy)
- English and Japanese media profiles and contact routes
- Verified television appearances
- Blog posts from blog.froystein.jp and Engineering at Intility
- Professional certifications
- Social media links (GitHub, LinkedIn)

## Technology Stack

- **Framework**: Astro with TypeScript
- **Build Tool**: Astro with Vite
- **Package Manager**: Bun
- **Styling**: Plain CSS
- **Color Scheme**: restrained light palette and Catppuccin Mocha dark palette through `prefers-color-scheme`
- **Rendering**: Static HTML with no production client JavaScript

## Project Structure

```
/src/
  /components/       # Reusable Astro components
  /data/             # Shared content, Markdown mirrors, and structured data
  /layouts/          # Shared HTML and metadata layouts
  /pages/            # File-based static routes
  /styles/           # Global CSS and theme tokens
/tests/              # Build-output tests
/public/
  - fc.svg           # Company logo
```

## Key Files

### src/pages/index.astro
The main page containing the homepage layout:
- Header with company name and language-aware navigation
- Consultancy and media-profile entry points
- Blog posts
- Certifications section
- Footer with copyright and social links

### src/layouts/BaseLayout.astro
Defines shared document metadata and the HTML shell.

### src/styles/global.css
Defines light and Catppuccin Mocha dark color tokens, typography, spacing, responsive layout, focus states, and print colors.

### src/data/content.ts
Defines shared television appearances, blog posts, certifications, media topics, and participation formats.

### src/data/markdown-content.ts
Generates clean Markdown mirrors for each canonical page. Add `.md` to the page path to open its Markdown version, such as `/media.md` or `/ja/contact.md`. `/llms.txt` and the HTML alternate links use these direct routes. Proposal-style `index.html.md` routes remain available as compatibility aliases.

## Development

```bash
# Install dependencies
just install

# Run development server
just dev

# Build for production
just build

# Preview production build
just preview
```

## Deployment

The site is deployed at https://www.froystein.jp/

## Related Sites

- Blog: https://blog.froystein.jp/
- Engineering blog: https://engineering.intility.com/

## Code Style

- Astro and TypeScript for static, type-safe pages
- Semantic HTML and plain CSS
- No client-side JavaScript unless a feature requires it
- Simple, straightforward structure without over-engineering
