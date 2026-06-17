# ⚡ GitDataset Hub Frontend

Welcome to the frontend application for the GitHub Dataset project! This React application provides a premium, responsive user interface to explore, search, filter, and copy dataset records retrieved from the backend catalog.

---

## 🛠️ Tech Stack & Features

- **Framework**: [React](https://react.dev/) (scaffolded via [Vite](https://vite.dev/))
- **Routing**: [React Router DOM v6](https://reactrouter.com/)
- **API Client**: [Axios](https://axios-http.com/)
- **Styling**: Premium Vanilla CSS (designed with HSL color variables, modern scrollbars, card hover glows, glassmorphism, responsive grid layout, and skeleton loaders)
- **Features**:
  - Live query search for dataset instructions, inputs, and outputs.
  - Dropdown filters based on metadata parameters (Dataset Type, Repository, Source Type).
  - High-fidelity copy-to-clipboard functionality for instructions, inputs, and outputs.
  - Responsive paginated interface.

---

## 📁 Project Structure

```text
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx       # Sticky glassmorphic header navigation
│   │   ├── DatasetCard.jsx   # Grid cards showcasing instruction, input, output, & metadata
│   │   └── Spinner.jsx       # Elegant loading spinner indicator
│   ├── pages/
│   │   └── DatasetPage.jsx   # Main view coordinating search, filters, grid, and pagination
│   ├── services/
│   │   └── api.js            # Axios client instance pointed to http://localhost:3000
│   ├── hooks/
│   │   └── useDatasets.js    # Custom Hook managing fetch logic, loading, errors, & parameters
│   ├── main.jsx              # App entry mountpoint
│   ├── App.jsx               # Client-side router declarations
│   └── index.css             # Tailored variables, responsive layout, and visual styles
├── index.html                # Document frame with optimized page headers and titles
├── package.json              # Script runner commands and dependencies
└── vite.config.js            # Vite configurations
```

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (version 18+ recommended) and the **backend server** is running on `http://localhost:3000`.

### 2. Installation
Navigate into the `frontend` folder and install dependencies:
```bash
# From the project root:
cd frontend
npm install
```

### 3. Run Development Server
Start the client application in development mode:
```bash
npm run dev
```
The application will boot up, typically at [http://localhost:5173](http://localhost:5173).

### 4. Build for Production
To bundle the assets into optimized static files for deployment (outputted to the `dist/` directory):
```bash
npm run build
```
You can preview the built files locally by executing:
```bash
npm run preview
```

---

## 🔌 API Service Configuration
The API service is configured in [src/services/api.js](file:///c:/Users/Priya/OneDrive/Desktop/project%20github%20dataset/github_dataset_priya/frontend/src/services/api.js):
```javascript
const API_BASE_URL = 'http://localhost:3000';
```
Ensure your backend `.env` has appropriate CORS rules enabled (the default backend already executes `app.use(cors())`, allowing the React port to communicate with the Node port).
