# Unified Career Platform

This project consolidates three powerful career tools into a single, unified application:
1.  **AI Resume Builder**: Create professional, ATS-friendly resumes.
2.  **Placement Readiness Platform**: Track your preparation for job placements with analytics and resources.
3.  **Job Notification Tracker**: Manage your job applications and stay organized.

## Project Structure

The project uses a modular architecture within a Vite + React application:

```text
src/
├── components/          # Shared UI components (Layout, Navbar, etc.)
├── modules/             # Feature modules
│   ├── resume/          # AI Resume Builder source code
│   ├── placement/       # Placement Platform source code
│   └── job-tracker/     # Job Notification Tracker source code
├── App.jsx              # Main routing and integration
└── index.css            # Unified styles (Tailwind + Design Tokens)
```

## Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Run Development Server**
    ```bash
    npm run dev
    ```

3.  **Build for Production**
    ```bash
    npm run build
    ```

## Development Notes

-   **Styling**: The project uses Tailwind CSS v4. Global styles and design tokens from the original projects have been merged into `src/index.css`.
-   **Routing**: `react-router-dom` handles navigation. Each module has its own internal routing logic which is integrated into the main `App.jsx`.
