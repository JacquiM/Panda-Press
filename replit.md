# JPanda Solutions Website

## Overview

This is a full-stack web application for JPanda Solutions, a technology consulting company. The application is built using a modern React frontend with Express.js backend, featuring a company website with service pages, blog functionality, and contact forms. The architecture is designed for a business consulting website that showcases services, expertise, and thought leadership content.

**Recent Major Achievement**: Successfully completed comprehensive migration of ALL blog content from thejpanda.com (22 posts total) with authentic images, technical implementation details, and real-world examples. The blog now features extensive content covering Power Platform, UiPath, automation, business intelligence, and custom development topics.

**Latest Update (Jan 31, 2025)**: Resolved critical GitHub Pages deployment issue - generated complete static blog data file containing all 22 posts with authentic content. GitHub Pages deployment now fully configured with automatic CI/CD pipeline, SPA routing support, and comprehensive blog content. Website ready for production deployment to https://[username].github.io/Panda-Press/

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **UI Library**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens for brand colors
- **State Management**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Session Management**: In-memory storage with planned database persistence
- **Development**: Hot module replacement via Vite integration

### Key Design Decisions

**Monorepo Structure**: The application uses a monorepo approach with shared types and schemas between client and server, enabling type safety across the full stack.

**Component-First UI**: Built using Shadcn/ui components which provide accessibility, customization, and consistency out of the box while maintaining design system flexibility.

**Static + Dynamic Content**: Blog posts are currently stored as static data but the architecture supports dynamic content management.

## Key Components

### Frontend Components
- **Layout Components**: Header with navigation, Footer with company info
- **Section Components**: Hero, Services, About, Blog Preview, Contact
- **UI Components**: Complete Shadcn/ui component library (buttons, forms, cards, etc.)
- **Page Components**: Home, Blog listing, 404 handling

### Backend Components
- **Storage Interface**: Abstracted storage layer with in-memory implementation
- **Route Registration**: Centralized route management
- **Vite Integration**: Development server with HMR support
- **Error Handling**: Centralized error middleware

### Data Models
- **User Schema**: Basic user model with username/password (using Drizzle ORM)
- **Blog Posts**: TypeScript interfaces for blog content structure

## Data Flow

### Client-Side Data Flow
1. React components use TanStack Query for API data fetching
2. Forms use React Hook Form with Zod validation
3. UI state managed through React hooks and context
4. Navigation handled by Wouter router

### Server-Side Data Flow
1. Express middleware processes requests
2. Routes delegate to storage interface
3. Storage implementation handles data persistence
4. Responses formatted as JSON with error handling

### Database Integration
- Drizzle ORM provides type-safe database operations
- PostgreSQL schema defined in shared directory
- Migration support through Drizzle Kit
- Environment-based database configuration

## External Dependencies

### Frontend Dependencies
- **UI/UX**: Radix UI primitives, Tailwind CSS, Lucide icons, React Icons
- **Data Fetching**: TanStack Query for server state
- **Forms**: React Hook Form, Hookform Resolvers
- **Routing**: Wouter for lightweight routing
- **Utilities**: Class Variance Authority, clsx, date-fns

### Backend Dependencies
- **Database**: Drizzle ORM, Neon Database driver
- **Validation**: Zod for schema validation
- **Session**: connect-pg-simple for PostgreSQL sessions
- **Development**: tsx for TypeScript execution, esbuild for production builds

### Development Tools
- **Build**: Vite with React plugin
- **TypeScript**: Strict configuration with path mapping
- **Database**: Drizzle Kit for migrations and schema management
- **Replit Integration**: Development banner and runtime error modal

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React application to `dist/public`
2. **Backend Build**: esbuild bundles server code to `dist/index.js`
3. **Database Setup**: Drizzle migrations applied via `db:push` command

### Environment Configuration
- **Development**: tsx runs server with hot reloading
- **Production**: Node.js runs built bundle
- **Database**: Environment variable for PostgreSQL connection string

### Hosting Considerations
- Static assets served from `dist/public`
- Express server handles API routes and SPA fallback
- PostgreSQL database required for user management
- Environment variables needed for database connection

### Scalability Notes
- In-memory storage can be replaced with database persistence
- API routes are modular and can be extended
- Frontend components are reusable and maintainable
- Database schema supports expansion for additional features