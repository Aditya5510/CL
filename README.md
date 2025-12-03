# Course Explorer

A React app for browsing courses. Click around, read content, track your progress. Pretty straightforward.

## Getting Started

### Run It

```bash
npm install
npm run dev
```

That's it. Open the URL it gives you (usually `localhost:5173`).

### Build It

```bash
npm run build
```

This spits out a `dist` folder with everything you need. Want to see what it looks like?

```bash
npm run preview
```

**Browse Courses**

- Sidebar shows all courses
- Click a course to see topics
- Click a topic to see subtopics
- Click a subtopic to read the actual content
- There's a search bar that filters as you type

**Track Progress**

- Check off subtopics when you're done
- See percentages at the topic and course level
- Everything saves to your browser automatically
- Updates happen right away, no refresh needed

**Admin Stuff**

- View users in a table (desktop) or accordion (mobile)
- Shows who's enrolled in what and their progress
- Read-only, so you can't mess anything up

**URLs Work**

- The URL changes as you navigate
- You can share links like `/courses/0/topics/2/subtopics/1`
- Back button works
- Bookmark anything

**Markdown Content**

- Subtopic content is markdown
- Code blocks get colored nicely
- All the usual markdown features work

## Why I Built It This Way

**State**

- Used Context API instead of something heavy like Redux
- Simple enough for what we need
- Progress lives in localStorage so it sticks around

**Styling**

- Tailwind for everything
- Black and yellow colors (Dortmund vibes)
- Sharp corners, no rounded edges
- Sidebar collapses on mobile

**Routing**

- React Router handles URLs
- Routes match the navigation structure
- URL and state stay in sync

**Data**

- JSON files in `public/data/` load when the app starts
- No server required
- Handles errors if files are missing

**Components**

- Organized by what they do (layout, courses, admin, etc.)
- Reusable pieces where it makes sense
- Each component does one thing

## Folder Structure

```
src/
├── components/
│   ├── layout/       # Header, sidebar, breadcrumbs
│   ├── courses/      # Course stuff
│   ├── admin/        # Admin panel
│   ├── common/       # Shared UI pieces
│   └── markdown/     # Markdown rendering
├── context/          # Global state
├── utils/            # Helper functions
└── App.jsx           # Main component
```

## Tech Used

- React 19
- Vite (build tool)
- Tailwind CSS
- React Router
- react-markdown
- react-syntax-highlighter

## Data Files

The app reads from:

- `public/data/cources.json` - All the course data
- `public/data/users.json` - User info for the admin panel

If these are missing or broken, the app shows empty states instead of crashing.
