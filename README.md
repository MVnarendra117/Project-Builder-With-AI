# DevArchitect - Project Builder
<img width="1918" height="933" alt="image" src="https://github.com/user-attachments/assets/dad9d2f3-e62a-4217-bd81-657c443d7f76" />


**DevArchitect** is an AI-powered platform designed to help engineering students, developers, and hobbyists bridge the gap between theoretical knowledge and real-world engineering. By generating comprehensive technical specifications, it enables users to build high-impact, portfolio-worthy applications.

## 🚀 The Mission

Many aspiring engineers struggle with the "What should I build?" problem. Simple To-Do lists or weather apps don't demonstrate the complexity required for senior roles. 

**DevArchitect** acts as a virtual Senior Principal Architect. It generates:
*   Real-world problem statements.
*   Full technical architectures.
*   Security and risk analyses.
*   Step-by-step implementation roadmaps.

## ✨ Key Features

*   **AI-Powered Ideation**: Utilizes Google's **Gemini 2.5 Flash** model to generate unique, high-fidelity project specifications.
*   **Domain Specific**: Tailored suggestions for industries like FinTech, Healthcare, AI/ML, DevOps, Cybersecurity, and more.
*   **Comprehensive Reports**: Each project includes:
    *   Challenge & Solution
    *   Tech Stack & Architecture
    *   User Personas
    *   UX Enhancements
    *   Security & Risk Analysis
    *   Implementation Roadmap
*   **History Management**: Locally persists your generated ideas so you can revisit them anytime.
*   **PDF Export**: Built-in "Print to PDF" functionality to save specifications as documents.
*   **Responsive Design**: A glassmorphism-inspired UI that works seamlessly on desktop and mobile.

## 🛠️ Technology Stack

This project is a modern Single Page Application (SPA) built with:

*   **Frontend**: React 19, TypeScript
*   **Build Tool**: Vite
*   **Styling**: Pure CSS3 (Custom Variables, Flexbox/Grid, Glassmorphism)
*   **AI Integration**: Google GenAI SDK (`@google/genai`)
*   **Icons**: Lucide React
*   **Storage**: Browser LocalStorage

## 📂 Project Structure

```
├── components/
│   ├── DeveloperInfo.tsx   # Developer profile and mission statement
│   ├── LandingPage.tsx     # Hero section and feature overview
│   ├── ProjectCard.tsx     # The detailed report display component
│   └── ProjectForm.tsx     # User input for industry and complexity
├── services/
│   └── geminiService.ts    # API logic to communicate with Google Gemini
├── types.ts                # TypeScript interfaces and Enums
├── App.tsx                 # Main application state and routing logic
├── styles.css              # Global styles, variables, and responsive design
├── index.tsx               # Entry point
└── index.html              # HTML shell
```

## ⚙️ How It Works

1.  **Landing**: The user is welcomed with a clean interface explaining the tool's value.
2.  **Selection**: The user selects a target domain (e.g., Cloud & Infrastructure, DevOps) and a complexity level.
3.  **Generation**: The app sends a structured prompt to the Gemini API, requesting a senior architect-level output.
4.  **Presentation**: The JSON response is parsed and rendered into a beautiful, interactive "Project Card."
5.  **Persistence**: Results are automatically saved to `localStorage` for future reference in the History sidebar.

## 🔒 Security & Privacy

*   **Client-Side Execution**: All logic runs in the browser.
*   **API Key**: Requires a Google Gemini API Key (handled via environment variables).
*   **Local Data**: History data is stored only on the user's device via LocalStorage; no database is required.

## 👨‍💻 Developer

Built by **Venkata Narendra M**.
*   **Location**: Vijayawada, India
*   **Goal**: To empower the next generation of software engineers.

---
*Built with ❤️ and React.*
