# Cross Connections

**A modern Bible reading and study application designed to help readers see Scripture as one connected story.**

Cross Connections combines a clean, mobile-first Bible reader with chronological timelines, historical context, verse-level tools, and connections throughout Scripture.

Rather than functioning only as a digital Bible, the goal of Cross Connections is to help readers understand **where they are in the biblical story, what is happening around the passage, and how events and passages connect across Scripture.**

> **Status:** 🚧 Active Development

---

## ✨ Features

### 📖 Bible Reader

A mobile-first Bible reading experience built around the public-domain **World English Bible (WEB)**.

- Full Bible navigation by book and chapter
- Previous/next chapter navigation across book boundaries
- Paragraph and poetry formatting
- Section headings
- Persistent reading location
- Smooth loading states and skeletons
- Customizable reading experience

Reader preferences can be saved between sessions, including:

- Font size
- Line height
- Letter spacing
- Reading presets

---

### 🎨 Verse Highlights

Readers can interact with individual verses without leaving the reading experience.

- Select individual verses
- Highlight verses using multiple colors
- Persistent highlights tied to the user's account
- Remove or change existing highlights
- Visual verse selection without shifting the surrounding text

---

### 🔖 Saved Verses

Important verses can be saved for later.

Saved verses are available from the user's dashboard and organized visually using their associated highlight colors.

---

### 💬 Verse Comments

Users can attach personal comments and notes directly to verses.

This allows Cross Connections to function not only as a reader, but also as a personal study environment.

---

### 🕰️ Scripture Timeline

The timeline presents biblical history as a structured chronological story instead of a flat list of disconnected events.

Major biblical eras act as parent sections containing more detailed events.

Examples include:

- Creation and the Early World
- The Patriarchs
- Exodus and the Wilderness
- Conquest and Judges
- The United and Divided Kingdoms
- Exile
- Return and Restoration
- The Gospels
- Acts and the Early Church

Timeline events can contain:

- Historical summaries
- Detailed descriptions
- Approximate dates and periods
- Categories
- Scripture references
- Related passages
- Era relationships

The timeline is being designed to allow readers to move naturally between **biblical history and the actual passages describing those events.**

---

### 🧭 Biblical Context

Cross Connections is being built around the idea that reading a verse is more useful when the reader can understand its larger context.

The application is being structured to support contextual information surrounding passages while keeping the primary reading experience clean and distraction-free.

---

### 🛠️ Administrative Tools

Cross Connections includes administrative tooling for managing editorial content without requiring changes directly in the database.

Current administrative capabilities include management of:

- Bible section headings
- Timeline eras
- Timeline events
- Event-to-passage relationships
- Published content

Role-based authorization protects administrative endpoints and UI functionality.

---

## 🧱 Technology Stack

### Frontend

- React
- Vite
- Material UI
- React Router
- Context API
- date-fns

### Backend

- Node.js
- Express
- Prisma ORM
- PostgreSQL
- JSON Web Tokens
- REST API

### Development & Infrastructure

- Docker
- Docker Compose
- pgAdmin
- Nodemon
- Git / GitHub

---

## 🏗️ Architecture

Cross Connections uses a separated client/server architecture.

```text
cross-connections/
│
├── client/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── layouts/
│       ├── pages/
│       └── utils/
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── prisma/
│   │   └── migrations/
│   ├── routes/
│   ├── services/
│   └── utils/
│
├── docker-compose.yml
└── README.md
```

The backend follows an MVC-style organization with separate routes, controllers, middleware, services, and utilities.

The frontend uses reusable components and page-level organization to keep larger application features maintainable as the project grows.

---

## 🔐 Authentication

Cross Connections uses a token-based authentication system designed to avoid storing long-lived credentials in browser storage.

- Short-lived access tokens are stored in application memory
- Refresh tokens are stored in **HttpOnly cookies**
- Protected routes require authentication
- Role-based middleware protects administrative functionality
- API requests automatically handle authentication and token refresh

---

## 🌐 API Layer

Frontend requests are routed through a shared `rawFetch` utility.

The API layer handles:

- Authorization headers
- HttpOnly refresh cookies
- Expired access-token refresh
- Automatic request retries
- JSON and non-JSON responses
- Centralized application feedback and error handling

This keeps authentication and API behavior consistent throughout the frontend.

---

## 🗄️ Database

Cross Connections uses **PostgreSQL** with **Prisma ORM**.

The database currently supports application data including:

- Users
- Authentication
- User metadata
- Bible books
- Chapters
- Verses
- Verse highlights
- Saved verses
- Verse comments
- Bible section headings
- Timeline eras
- Timeline events
- Event passage relationships

Prisma migrations are version-controlled so database schema changes remain reproducible throughout development.

---

## 🐳 Local Development

Cross Connections uses Docker Compose to provide the local development environment.

The development stack includes:

- PostgreSQL
- pgAdmin
- Express API
- React/Vite client

### Clone the repository

```bash
git clone <repository-url>
cd cross-connections
```

### Environment Variables

Create the required local environment files for the server and client.

Environment files are intentionally excluded from version control.

Example:

```env
DATABASE_URL=
JWT_SECRET=
REFRESH_TOKEN_SECRET=
```

Additional environment variables may be required as development continues.

### Start the application

```bash
docker compose up --build
```

The Docker environment provides the application services and development dependencies required to run Cross Connections locally.

---

## 📚 Bible Translation

The current application uses the **World English Bible (WEB)**.

WEB is a modern English translation available in the public domain, making it suitable for use within the application without requiring a proprietary Bible translation license.

Bible source data has been imported and structured for application use while preserving formatting needed for paragraphs, poetry, chapters, and verses.

---

## 🗺️ Roadmap

Cross Connections is under active development.

Planned and ongoing work includes:

- Expanded verse and passage context
- Scripture cross-connections
- Continued timeline development
- Improved historical context
- Timeline imagery
- Search
- Additional reader customization
- Expanded study tools
- Audio Bible support
- Editorial/admin workflows
- Production deployment

The long-term goal is to create an approachable Bible study experience that connects **reading, chronology, context, and Scripture references** without overwhelming the reader.

---

## 🎯 Project Goals

Cross Connections is built around several core principles:

**Readable**  
The Bible reader should remain clean and comfortable even as additional study features are added.

**Connected**  
Passages should not feel isolated. Readers should be able to understand how people, events, places, and passages relate to the larger biblical story.

**Approachable**  
Historical and biblical context should be useful to everyday readers without requiring a theological education.

**Mobile First**  
The primary reading experience is designed around the way people actually read on their phones.

**Maintainable**  
The application uses reusable components, centralized API behavior, database migrations, role-based authorization, and clear separation between client and server responsibilities.

---

## 🚧 Development Status

Cross Connections is currently an **active work in progress**.

Features, database structures, UI designs, and development setup may change as the project progresses.

---

## 👨‍💻 Developer

Built and maintained by **Caleb Hoffman**.

This project is being developed as both a production-oriented application and an exploration of building a full-stack reading and study platform with React, Node.js, Express, Prisma, and PostgreSQL.

---

## 📄 License

Application source code licensing has not yet been finalized.

Bible text used by the application is sourced from the public-domain **World English Bible (WEB)**.