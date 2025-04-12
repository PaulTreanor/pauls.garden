# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands
- `npm install` - Install dependencies
- `npm run dev` - Start development server
- `npm run build` - Production build (outputs to /out)
- `npm run lint` - Run ESLint
- `npm run clean` - Remove .next directory

## Code Style
- **TypeScript**: Use strict mode, ES6 target
- **Imports**: Group by external/internal, alphabetize
- **Components**: React functional components with explicit return types
- **Naming**: camelCase for variables/functions, PascalCase for components
- **Paths**: Use absolute imports with '@/' alias
- **Styling**: Tailwind CSS with custom color palette:
  - Soft green: #e6ede8
  - Champagne: #f8f5f2
  - Medium green: #588157
  - Dark green: #3a5a40

## Content
- MDX files in /posts directory with frontmatter (title, date, tags)
- Files named YYYY-MM-DD-title-slug.mdx