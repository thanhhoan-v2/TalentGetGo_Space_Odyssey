<table width="100%">
  <tr>
    <td align="left" width="120">
      <img src="public/talentgetgo-logo.png" alt="TalentGetGo Logo" width="100" />
      <img src="public/starwars-logo.png" alt="TalentGetGo Logo" width="100" />
    </td>
    <td align="right">
      <h1>Space Odyssey</h1>
      <h3 style="margin-top: -10px;">A modern Star Wars marketing application built with Next.js 15 and TypeScript. This project demonstrates advanced frontend development skills through a visually appealing marketing website that showcases Star Wars films, characters.</h3>
    </td>
  </tr>
</table>

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Integration](#api-integration)
- [Design Decisions](#design-decisions)
- [Challenges and Solutions](#challenges-and-solutions)
- [Future Improvements](#future-improvements)

## Overview

Space Odyssey is a cutting-edge Star Wars marketing application that showcases modern frontend development practices. Built with Next.js 15 and TypeScript, this project demonstrates advanced React patterns, GraphQL integration, and sophisticated state management while delivering an immersive Star Wars experience.

The application serves as both a portfolio piece and a functional marketing platform, featuring dynamic content from multiple Star Wars APIs, smooth animations, and a responsive design that works seamlessly across all devices.

## Completed Core Requirements

✅ **Home**: Hero section with marketing copy and featured films.

✅ **Films List**: Display all films (title, release date, director, opening crawl excerpt).

✅ **Film Detail**: Show full details, including characters, planets, starships.

✅ **Characters**: Implement pagination/infinite scroll and search functionality.

## Features

### **Film Catalog**

- Complete Star Wars film database with detailed information
- Dynamic film pages with opening crawls and character connections
- Related characters, planets, and starships for each film
- Optimized image loading and caching

### **Character Explorer**

- Interactive character grid with infinite scroll
- Real-time search functionality with client-side filtering
- Character detail pages with biographical and appearance data
- Favorite character system with localStorage persistence
- Character image gallery with optimized loading

### **Modern UI/UX**

- Smooth animations powered by Framer Motion and GSAP
- Dark/light theme switching with `next-themes`
- Responsive design optimized for mobile, tablet, and desktop
- Interactive hover effects and micro-interactions
- Carousel components with Swiper integration

### **Performance Optimizations**

- Static site generation (SSG) with incremental regeneration
- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Caching strategies for API calls
- SEO optimization with dynamic meta tags

### **Accessibility & SEO**

- ARIA labels and semantic HTML structure
- Dynamic sitemap generation
- Open Graph and Twitter Card meta tags
- Proper heading hierarchy and keyboard navigation

## Tech Stack

This project leverages cutting-edge web technologies:

**Frontend & Framework**

- **Next.js 15.4.1** with Turbopack for blazing-fast development
- **React 19.1.0** with latest features and concurrent rendering
- **TypeScript 5.x** with strict mode for type safety

**Styling & Animation**

- **Tailwind CSS 4.1.11** for utility-first styling
- **Framer Motion 12.23.6** for smooth animations
- **GSAP 3.13.0** for advanced animations
- **next-themes** for seamless theme switching
- **Lucide React** for consistent iconography

**Data & API Integration**

- **Apollo Client** for GraphQL state management
- **SWAPI GraphQL** endpoint for film data
- **SWAPI.tech REST API** for character data
- Custom caching and data transformation layers

**UI Components**

- **Radix UI** for accessible component primitives
- **Swiper** for carousel functionality
- **Canvas Confetti** for celebration effects
- **react-responsive** for responsive utilities

**Development & Testing**

- **Storybook 9.0.17** for component development and documentation
- **Vitest** for unit testing with modern test runner
- **Jest & Testing Library** for component and integration testing
- **Cypress & Playwright** for end-to-end testing
- **MSW (Mock Service Worker)** for API mocking

**Code Quality & DevOps**

- **ESLint 9** with Next.js config for code linting
- **Prettier 3.6.2** for consistent code formatting
- **Husky** for git hooks management
- **lint-staged** for pre-commit checks
- **TypeScript strict mode** with comprehensive type definitions

### CI/CD

> **GitHub Actions** for continuous integration and code quality

- Runs on every push and pull request to `main` and `develop` branches
- Matrix testing on Node.js 18.x and 20.x
- Steps include:
  - Install dependencies with pnpm
  - Lint code with ESLint
  - Check formatting with Prettier
  - Type check with TypeScript
  - Run tests with pnpm
- On pushes to `main`, automatically applies and commits ESLint and Prettier fixes

## Getting Started

### Prerequisites

- **Node.js** 18.0 or later
- **pnpm** (recommended) or npm/yarn
- Git for version control

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/thanhhoan-v2/TalentGetGo_Space_Odyssey.git
   cd TalentGetGo_Space_Odyssey
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start the development server**

   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
# Development
pnpm dev          # Start development server with Turbopack
pnpm build        # Build for production
pnpm start        # Start production server

# Testing
pnpm test         # Run Jest tests
pnpm test:watch   # Run tests in watch mode

# Code Quality
pnpm lint         # Run ESLint
pnpm lint:fix     # Fix ESLint issues automatically

# Storybook
pnpm storybook    # Start Storybook development server
pnpm build-storybook  # Build Storybook for production
```

## Project Structure

```
src/
├── api/                    # API integration utilities
├── assets/                 # Static assets (character images)
│   ├── characters/         # Character profile images
│   └── characters-id/      # Character ID mappings
├── components/             # Reusable React components
│   ├── animated/           # Animation components
│   ├── characters/         # Character-related components
│   │   ├── detail/         # Character detail components
│   │   ├── grid/           # Character grid components
│   │   └── search/         # Character search components
│   ├── common/             # Shared components
│   ├── films/              # Film-related components
│   ├── resource-cards/     # Planet, Starship card components
│   └── ui/                 # Base UI components
├── hooks/                  # Custom React hooks
│   ├── use-characters.ts   # Character data management
│   ├── use-infinite-scroll.ts  # Infinite scroll
│   └── use-mounted.ts      # Client-side mounting detection
├── lib/                    # Core libraries and configurations
│   ├── apollo-client.ts    # GraphQL client setup
│   ├── queries.ts          # GraphQL queries
│   └── utils.ts            # Utility functions
├── pages/                  # Next.js pages and API routes
│   ├── api/                # API endpoints
│   ├── characters/         # Character pages
│   ├── films/              # Film pages
│   ├── _app.tsx            # App configuration
│   ├── _document.tsx       # Document setup
│   └── index.tsx           # Homepage
├── styles/                 # Global styles
├── utils/                  # Utility functions and helpers
│   ├── assets.ts           # Asset management
│   ├── constants.ts        # Application constants
│   ├── graphql-schema.ts   # GraphQL type definitions
│   ├── routes.ts           # Route definitions
│   ├── swapi-graphql.ts    # GraphQL API utilities
│   ├── swapi-tech.ts       # SWAPI.tech API utilities
│   └── swapi.ts            # Original SWAPI utilities
```

### Key Architectural Decisions

- **Hybrid API Strategy**: Combines GraphQL (films) and REST (characters) APIs for optimal data fetching
- **Component Organization**: Domain-driven folder structure for better maintainability
- **Type Safety**: Comprehensive TypeScript interfaces for all API responses
- **State Management**: Local state with custom hooks, Apollo Client for GraphQL cache
- **Image Strategy**: Local assets for characters, remote assets for planets/starships

## API Integration

### Dual API Architecture

The application intelligently combines two Star Wars APIs to provide comprehensive data coverage:

#### 1. **SWAPI GraphQL** (`swapi-graphql.netlify.app`)

- **Purpose**: Primary source for film data and relationships
- **Advantages**: Rich relational data, efficient queries, type safety
- **Usage**: Film details, character connections, planet and starship relationships

```typescript
const GET_FILM_BY_ID = gql`
  query GetFilmById($filmID: ID!) {
    film(filmID: $filmID) {
      title
      director
      releaseDate
      openingCrawl
      characterConnection {
        edges {
          node {
            name
            birthYear
            gender
          }
        }
      }
    }
  }
`;
```

#### 2. **SWAPI.tech REST API** (`swapi.tech`)

- **Purpose**: Detailed character information and search functionality
- **Advantages**: More complete character data, better for search/pagination
- **Usage**: Character listings, detailed character profiles, search functionality

```typescript
export async function fetchCharacters(page: number = 1, search?: string) {
  const url = new URL('https://www.swapi.tech/api/people');
  url.searchParams.set('page', page.toString());
  url.searchParams.set('limit', '10');

  const response = await fetch(url.toString());
  return response.json();
}
```

### Data Transformation Layer

Custom utilities handle API differences and provide consistent interfaces:

```typescript
// Convert SWAPI.tech format to standardized format
function convertSwapiTechToPerson(character: SwapiTechCharacter): IPerson {
  return {
    name: character.name,
    url: character.url,
    // ... other transformations
  };
}
```

### Caching Strategy

- **Apollo Client**: Automatic GraphQL response caching
- **Custom Cache**: 30-minute cache for character search data
- **Static Generation**: Build-time data fetching with revalidation
- **Image Optimization**: Next.js automatic image caching

## Design Decisions

### 1. **Framework Choice: Next.js 15**

- **SSG/ISR**: Perfect for content-heavy applications with SEO requirements
- **Performance**: Built-in optimizations for images, fonts, and code splitting
- **Developer Experience**: Turbopack for faster development builds
- **Deployment**: Seamless Vercel integration

### 2. **API Strategy: Hybrid GraphQL + REST**

- **GraphQL for Films**: Rich relational data perfect for film details
- **REST for Characters**: Better pagination and search capabilities
- **Unified Interface**: Custom transformation layer provides consistent data structure

### 3. **State Management: Local + Apollo**

- **Apollo Client**: Handles GraphQL caching and network state
- **Custom Hooks**: Encapsulate complex state logic (search, infinite scroll)
- **Local Storage**: User preferences and favorites persistence

### 4. **Styling: Tailwind CSS + Component Libraries**

- **Utility-First**: Rapid development with consistent design system
- **Radix UI**: Accessible primitives for complex components
- **Custom Components**: Domain-specific components built on solid foundations

---

> Why Tailwind CSS and shadcn/ui over CSS-in-JS?

The primary reason for choosing Tailwind CSS and shadcn/ui instead of a CSS-in-JS solution is that I am not particularly strong with CSS-in-JS approaches, and the assignment did not require the use of any specific styling framework. This allowed me to select tools that best fit my workflow and strengths.

**Benefits of Tailwind CSS over CSS-in-JS:**

- **Faster Prototyping:** Utility classes enable rapid UI development without context switching between JS and CSS files.
- **Smaller Bundle Size:** No runtime style generation; styles are purged and tree-shaken at build time.
- **Predictable Styling:** Class-based approach avoids specificity issues and makes it easy to see all styles applied to an element.
- **Consistent Design System:** Enforces design tokens and spacing scales across the app.
- **Better Performance:** No runtime style injection, resulting in faster page loads and less JavaScript overhead.
- **Community & Ecosystem:** Large ecosystem, plugins, and integrations (like shadcn/ui) for accessible, composable UI primitives.

---

### 5. **Animation Strategy: Multi-Library Approach**

- **Framer Motion**: React-first animations for components
- **GSAP**: Complex animations and performance-critical scenarios
- **CSS Transitions**: Simple state changes and hover effects

### 6. **Testing Philosophy: Comprehensive Coverage**

- **Unit Tests**: Component logic and utility functions
- **Integration Tests**: Component interactions and API integrations
- **E2E Tests**: Critical user journeys and workflows
- **Visual Testing**: Storybook for component documentation and testing

## Challenges and Solutions

### 1. **API Limitations and Inconsistencies**

**Challenge**: SWAPI GraphQL provides excellent film data but limited character details, while SWAPI.tech has comprehensive character data but weaker relational queries.

**GraphQL Query for getting all characters:**

```graphql
query MyQuery {
  allPeople {
    edges {
      cursor
      node {
        id
        name
        birthYear
        eyeColor
        gender
        hairColor
        height
        homeworld {
          name
        }
        mass
        skinColor
        species {
          name
        }
        filmConnection(first: 10) {
          edges {
            node {
              title
            }
          }
        }
        starshipConnection(first: 10) {
          edges {
            node {
              name
            }
          }
        }
        vehicleConnection(first: 10) {
          edges {
            node {
              name
            }
          }
        }
      }
    }
  }
}
```

> **Note:** Despite requesting many fields, this query only returns the character's `id` and `name`. All other fields are returned as `null`.

**Solution**:

- Implemented a hybrid API strategy using both endpoints
- Created a unified data transformation layer
- Built custom caching to minimize API calls
- Used TypeScript interfaces to maintain type safety across different data sources

```typescript
// Unified interface despite different API structures
interface IPerson {
  name: string;
  height: string;
  // ... consistent structure regardless of source
}
```

### 2. **Performance with Large Datasets**

**Challenge**: Loading 82+ characters with infinite scroll while maintaining smooth performance.

**Solution**:

- Implemented virtual scrolling concepts with pagination
- Client-side caching with 30-minute TTL
- Optimized image loading with Next.js Image component
- Lazy loading for non-critical components

```typescript
// Efficient caching strategy
let allCharactersCache: SwapiTechCharacter[] = [];
let cacheTimestamp = 0;
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes
```

### 3. **Complex State Management for Search**

**Challenge**: Real-time search across paginated data with different loading states.

**Solution**:

- Custom `useCharacters` hook encapsulating all search logic
- Debounced search to prevent excessive API calls
- Proper loading states and error handling
- Client-side filtering for instant results

```typescript
// Custom hook for complex character state
export function useCharacters({ initialCharacters, initialCount }) {
  // Encapsulates search, pagination, and loading logic
}
```

### 4. **Type Safety with Dynamic APIs**

**Challenge**: Maintaining type safety when working with external APIs that can change.

**Solution**:

- Comprehensive TypeScript interfaces for all API responses
- Runtime validation where necessary
- Fallback handling for missing or malformed data
- Separate interfaces for different API sources

### 5. **SEO and Static Generation**

**Challenge**: Dynamic content from APIs while maintaining SEO performance.

**Solution**:

- Static generation at build time for core content
- Incremental Static Regeneration (ISR) for updates
- Dynamic sitemap generation
- Proper meta tags and Open Graph optimization

```typescript
export const getStaticProps: GetStaticProps = async () => {
  // Build-time data fetching for SEO
  const result = await fetchCharacters(1);
  return {
    props: { initialCharacters: result.characters },
    revalidate: 86400, // 24-hour revalidation
  };
};
```

### 6. **Cross-Browser Animation Performance**

**Challenge**: Smooth animations across different browsers and devices.

**Solution**:

- Used `will-change` CSS property for performance-critical animations
- Hardware acceleration with GPU-optimized transforms
- Intersection Observer for scroll-triggered animations
- Fallbacks for reduced motion preferences

## Future Improvements

### **Technical Enhancements**

1. **GraphQL Federation**
   - Implement Apollo Federation to unify multiple Star Wars APIs
   - Create a unified schema for all Star Wars data
   - Enable complex cross-API queries

2. **Advanced Caching**
   - Implement Redis for server-side caching
   - Add service worker for offline functionality
   - Progressive Web App (PWA) capabilities

3. **Performance Optimizations**
   - Bundle analysis and optimization
   - Implement virtual scrolling for large lists
   - Add prefetching for predicted user navigation

4. **Custom Star Wars GraphQL API Wrapper**
   - Plan to fork the [swapi-graphql repository](https://github.com/graphql/swapi-graphql/tree/master) and develop my own Star Wars API GraphQL wrapper.
   - Goal: Re-create the project with a unified GraphQL API for more consistent and maintainable API integration, replacing the current split between GraphQL and REST APIs.

### **User Experience**

1. **Enhanced Interactivity**
   - 3D character model viewer using _React Three Fiber_
   - Interactive timeline of Star Wars events
   - Advanced filtering and sorting options

2. **Personalization**
   - User accounts and personalized recommendations
   - Custom character collections and lists
   - Sharing functionality for favorite characters/films

3. **Accessibility**
   - Screen reader optimizations
   - Keyboard navigation improvements
   - High contrast mode support

### **Gamification**

1. **Interactive Features**
   - Character comparison tools
   - Star Wars trivia integration
   - Achievement system for exploration

2. **Community Features**
   - User reviews and ratings
   - Discussion forums for characters/films
   - Social sharing capabilities

---

**Live Demo**: [https://talent-get-go-space-odyssey.vercel.app/](https://talent-get-go-space-odyssey.vercel.app/)

**LinkedIn**: [Phan Dinh Thanh Hoan](https://www.linkedin.com/in/phan-dinh-thanh-hoan/)
