# Second Brain Frontend

This project is a React + TypeScript frontend for a “second brain” style content dashboard. It lets a signed-in user collect, view, filter, and share different kinds of online content such as images, videos, articles, tweets, and LinkedIn posts. The UI is built with Vite, React, React Router, Zustand, Axios, and Tailwind CSS.

## What the app does?

At a high level, the frontend provides four main experiences:

- Authentication entry points for sign up and sign in
- A personal dashboard where the user can view their saved content cards
- A modal-based workflow for adding new content to the brain
- A shareable view that displays a public or shared brain page for another user

The app is designed around a simple content management flow:

1. The user signs in or signs up.
2. The frontend stores the JWT token in localStorage.
3. The dashboard fetches the user’s saved content from the backend.
4. The user can filter content by type, add new content, delete existing content, or generate a shareable share link.
5. A shared link opens a read-only view of the same content collection.

## Architecture overview

### Frontend stack

- React 19 for component-based UI
- TypeScript for typed components and stores
- Vite for development/build tooling
- React Router for route-based navigation
- Zustand for global state management
- Axios for HTTP requests to the backend
- Tailwind CSS for the UI styling system

### Main application entry points

- [src/main.tsx](src/main.tsx) mounts the React app into the root DOM node.
- [src/App.tsx](src/App.tsx) defines the main router and route mapping.

## Routing

The app uses client-side routing with React Router:

- `/` -> landing/auth page
- `/signin` -> sign-in page
- `/dashboard` -> authenticated dashboard
- `/api/v1/brain/:shareLink` -> shared brain view for a public share link

The route structure is intentionally simple. The dashboard and shared-brain pages both reuse the same sidebar and card layout, while the auth pages are focused on login/signup UX.

## State management

Global UI and data state are managed with Zustand stores in [src/store.ts](src/store.ts).

### Sidebar state

- `useSidebarstore` controls whether the sidebar is collapsed or expanded.

### Modal state

- `useAddContentStore` toggles the “Add Content” modal.
- `useShareContentStore` toggles the “Share Brain” modal.

### Content state

- `useUserContents` stores the current user’s content list and fetches it from the backend using a GET request to `/api/v1/content`.
- `useSharedUserContents` stores content for a shared brain and fetches it from `/api/v1/brain/:shareLink`.
- `useFilterType` stores the current content filter (`all`, `photo`, `video`, `article`, `tweet`, `linkedin`, or `reel` in the code path).

The store layer keeps the UI logic simple: components can read global state without manually passing props through long chains.

## Pages

### Landing page

The landing page is implemented in [src/Pages/Landing.tsx](src/Pages/Landing.tsx). It provides a single form with:

- Username input
- Password input
- Sign in button
- Sign up button

On sign up, it sends a POST request to the backend auth signup endpoint. On sign in, it sends a POST to the login endpoint, stores the returned JWT in localStorage, and navigates to the dashboard.

### Sign-in page

The sign-in page in [src/Pages/Signin.tsx](src/Pages/Signin.tsx) is a lighter version of the landing experience. It focuses only on logging in.

### Dashboard

The dashboard in [src/Pages/Dashboard.tsx](src/Pages/Dashboard.tsx) is the main authenticated view. It:

- Loads the current user’s content on mount and periodically refetches it every second
- Applies the active sidebar filter to the content list
- Renders cards for each content item
- Shows action buttons for adding content and sharing the brain

### Shared brain page

The shared brain view in [src/Pages/SharedBrain.tsx](src/Pages/SharedBrain.tsx) is read-only. It reads the share identifier from the URL path, fetches the shared content from the backend, and renders the same content cards using a different display component.

## Components

### Sidebar

The sidebar component in [src/Components/Sidebar.tsx](src/Components/Sidebar.tsx) provides category navigation:

- Home (all items)
- Images
- Videos
- Articles
- Tweets
- LinkedIn posts

The sidebar also contains the collapse/expand toggle, which changes the width of the panel with animation.

### SidebarItem

[src/Components/SidebarItem.tsx](src/Components/SidebarItem.tsx) renders each filter button in a consistent style and highlights the active selection.

### Button

[src/Components/Button.tsx](src/Components/Button.tsx) is a reusable button wrapper with:

- Primary and secondary visual variants
- Small, medium, and large sizes
- A loading state while an async click handler is running

### AddContentModal

The modal in [src/Components/AddContentModal.tsx](src/Components/AddContentModal.tsx) lets the user add a new piece of content.

It collects:

- Title
- Link
- Content type (video, photo, article, tweet, linkedin)
- Tags

Before submitting, it transforms incoming links into formats suitable for embedding:

- YouTube URLs are converted into embed URLs
- LinkedIn URLs are converted into LinkedIn embed URLs when possible

Then it sends a POST request to `/api/v1/content` with the authentication token.

### ShareContentModal

The share modal in [src/Components/ShareContentModal.tsx](src/Components/ShareContentModal.tsx) calls the backend share endpoint and displays a generated frontend URL for the shared brain.

### Card

The main card component in [src/Components/Card.tsx](src/Components/Card.tsx) renders a single content item for the logged-in user. It shows:

- The title and icon for the content type
- The content preview (iframe, image, tweet embed, or LinkedIn embed)
- A delete button to remove the item from the backend

### ShowCard

[src/Components/showCard.tsx](src/Components/showCard.tsx) is a read-only version of the card used on the shared-brain page.

## Content rendering

The app supports different content types with custom rendering logic.

### Images

Photo content is rendered directly as an `<img>` tag.

### Videos

Video content uses an `<iframe>` embed derived from a YouTube URL.

### Articles

Article content shows a link that opens the article in a new tab.

### Tweets

Tweet content is rendered using the Twitter widgets script in [src/Tweet.tsx](src/Tweet.tsx). The component extracts the tweet ID from the URL and injects an embeddable tweet into the page.

### LinkedIn posts

LinkedIn content is rendered with the LinkedIn embed URL generator in [src/utils/embedLinks.ts](src/utils/embedLinks.ts) and displayed inside an iframe via [src/LinkedInPost.tsx](src/LinkedInPost.tsx).

## Utility functions

The helper file [src/utils/embedLinks.ts](src/utils/embedLinks.ts) converts raw external URLs into embed-friendly URLs for YouTube and LinkedIn. This is one of the key pieces that makes the UI feel like a “content brain” instead of a plain link list.

## Configuration

The app keeps its backend and frontend origin settings in [src/config.ts](src/config.ts):

- `BACKEND_URL` points to the deployed backend service
- `FRONTEND_URL` points to the deployed frontend service

This makes it easy to switch between local and deployed environments.

## Data shape

The frontend expects content objects shaped roughly like this:

```ts
interface Content {
  _id: string;
  link: string;
  type: 'photo' | 'video' | 'article' | 'tweet' | 'linkedin';
  title: string;
  tags: string[];
  userId: string;
}
```

## Project structure

```text
src/
  App.tsx
  main.tsx
  store.ts
  config.ts
  Tweet.tsx
  LinkedInPost.tsx
  Components/
    Sidebar.tsx
    SidebarItem.tsx
    Card.tsx
    showCard.tsx
    AddContentModal.tsx
    ShareContentModal.tsx
    Button.tsx
  Pages/
    Landing.tsx
    Signin.tsx
    Dashboard.tsx
    SharedBrain.tsx
  assets/
    SidebarIcons/
    hero.png
    ...
  utils/
    embedLinks.ts
```

## How the frontend works end to end

1. The user opens the app and lands on the auth screen.
2. After login, the app stores a JWT in localStorage.
3. The dashboard fetches the user’s content from the backend.
4. The sidebar lets the user switch between categories.
5. The add-content modal collects a URL and metadata, normalizes the URL for embedding, and posts the content to the backend.
6. The content list re-renders immediately as cards.
7. The user can delete content or generate a shareable link.
8. A shared link opens a public view of the same content through a separate route.

## Development commands

From the project root, you can run:

```bash
npm install
npm run dev
```

To build for production:

```bash
npm run build
```

To lint the project:

```bash
npm run lint
```

## Notes about the current implementation

The codebase is functional and straightforward, but it is still relatively lightweight and has a few implementation details worth noting:

- Authentication is token-based and uses localStorage rather than a more modern auth state abstraction.
- The dashboard refetches content every second, which is simple but can be noisy for larger datasets.
- The UI uses browser alerts for feedback instead of a more polished toast system.
- The app relies heavily on the backend for persistence and content retrieval.

In short, this frontend acts as a polished content aggregator and viewer for a backend-driven “second brain” product, with a focus on ease of collection, category-based organization, and shareable content views.
