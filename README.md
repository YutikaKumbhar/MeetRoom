# MeetRoom

MeetRoom is a browser-based video meeting app. Users can register or sign in, join a meeting room by code, talk over video and audio, share their screen, exchange chat messages, and view their meeting history.

## Features

- User registration and login
- Create or join a meeting by entering a meeting code
- Live video and audio using browser media devices and WebRTC
- Screen sharing where supported by the browser
- In-room chat using Socket.IO
- Meeting activity history stored in MongoDB
- Responsive landing, lobby, meeting, and history pages

## Tech stack

- **Frontend:** React, Vite, Material UI, Socket.IO Client
- **Backend:** Node.js, Express, Socket.IO
- **Database:** MongoDB with Mongoose
- **Media:** WebRTC and browser media APIs

## Project structure

```text
.
├── backend/
│   ├── src/
│   │   ├── controllers/    # User API and Socket.IO meeting logic
│   │   ├── models/         # Mongoose user and meeting models
│   │   ├── routes/         # User API routes
│   │   └── app.js          # Express and Socket.IO server entry point
│   └── package.json
├── frontend/
│   ├── public/             # Static images and icons
│   ├── src/
│   │   ├── contexts/       # Shared authentication and API context
│   │   ├── pages/          # Landing, authentication, room, history, meeting
│   │   ├── styles/         # CSS modules
│   │   └── App.jsx         # Client-side routes
│   └── package.json
└── README.md
```

## Requirements

- Node.js and npm
- A MongoDB database
- A modern browser with camera and microphone access for video meetings

## Getting started

### 1. Configure MongoDB

The backend connects to MongoDB when it starts. Configure the MongoDB connection string in `backend/src/app.js` for your own database before running the server. Do not commit credentials or private connection strings to the repository.

Make sure the database user and network access rules allow the backend to connect.

### 2. Install dependencies

Open two terminals from the project root.

In the first terminal:

```bash
cd backend
npm install
```

In the second terminal:

```bash
cd frontend
npm install
```

### 3. Start the backend

From the `backend` directory:

```bash
npm run dev
```

The backend listens on port `8000` by default and serves the REST API and Socket.IO connection.

### 4. Start the frontend

From the `frontend` directory:

```bash
npm run dev
```

Open the local URL printed by Vite in your browser (usually `http://localhost:5173`).

The frontend currently connects to the backend at `http://localhost:8000`. If you change the backend host or port, update the client URLs in `frontend/src/contexts/AuthContext.jsx` and `frontend/src/pages/VideoMeet.jsx` to match.

## Application routes

| Route | Description |
| --- | --- |
| `/` | Landing page |
| `/auth` | Sign-in and registration |
| `/room` | Authenticated meeting-code entry page |
| `/history` | Meeting activity history |
| `/:url` | Meeting room identified by the URL segment |

## API endpoints

The user API is mounted at `/api/v1/users`.

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/register` | Register a user |
| `POST` | `/login` | Sign in and receive an authentication token |
| `POST` | `/add_to_activity` | Add a meeting code to user history |
| `GET` | `/get_all_activity` | Retrieve meeting history |

The frontend and backend are configured for local development with the backend on port `8000`.

## Useful commands

### Frontend (`frontend/`)

```bash
npm run dev       # Start Vite development server
npm run build     # Create a production build in frontend/dist
npm run preview   # Preview the production build
npm run lint      # Run ESLint
```

### Backend (`backend/`)

```bash
npm run dev       # Start backend with nodemon
npm start         # Start backend with Node.js
npm run prod      # Start using the configured PM2 command
```

## Browser permissions

The browser will request camera and microphone access for the lobby preview and meeting. Allow these permissions to use video and audio. Screen sharing depends on browser support and user permission. Camera and microphone access generally requires `localhost` during development or HTTPS when deployed.

## Troubleshooting

- **Backend fails to start or connect to the database:** Check the MongoDB connection string, database credentials, and network access settings in `backend/src/app.js`.
- **Frontend requests fail:** Confirm the backend is running on port `8000` and that its URL matches the URLs configured in the frontend.
- **Camera or microphone is unavailable:** Check browser permissions, confirm another application is not exclusively using the device, and use `localhost` or HTTPS.
- **Meeting media does not connect across networks:** The app currently configures a public STUN server. Some network environments require a TURN server for reliable peer-to-peer connectivity.
- **Meeting history is empty:** History is associated with the signed-in user and is populated when meeting activity is recorded.