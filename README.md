# StockBot UI

A React application for managing stock watch lists with authentication.

## Features

- **Authentication**: JWT-based authentication using React Context API
- **Protected Routes**: Guest users see only the welcome/login page
- **Watch Lists**: Authenticated users can view their stock watch lists
- **Modern UI**: Clean and responsive design

## Project Structure

```
src/
├── contexts/
│   └── AuthContext.jsx      # Authentication context and state management
├── services/
│   └── api.js               # API service functions
├── pages/
│   ├── WelcomePage.jsx      # Welcome/login page for guests
│   ├── WelcomePage.css
│   ├── WatchListsPage.jsx   # Watch lists page for authenticated users
│   └── WatchListsPage.css
├── components/
│   └── ProtectedRoute.jsx   # Route protection component
├── App.jsx                  # Main app component with routing
└── main.jsx                 # Entry point
```

## API Endpoints

- **Login**: `POST https://example.com/api/auth/login`
  - Body: `{ username: string, password: string }`
  - Returns: `{ token: string }` (JWT)

- **Watch Lists**: `GET https://example.com/api/watch-lists`
  - Headers: `Authorization: Bearer <token>`
  - Returns: Array of `{ id: number, name: string }`

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Usage

1. **Guest Access**: When not logged in, users see the welcome page with a login form
2. **Login**: Enter username and password to authenticate
3. **Watch Lists**: After successful login, users are redirected to `/stock/watch-lists` to view their stock watch lists
4. **Logout**: Click the logout button to return to the welcome page

## Technologies

- React 19
- React Router DOM 7
- Vite 7
- Context API for state management
