# Resume Builder Application

A modern web-based platform for creating and customizing professional resumes with multiple templates and real-time preview capabilities.

## Features

- User authentication with email/password
- Multiple professional resume templates:
  - Modern: Clean and professional design
  - Classic: Traditional and formal layout
  - Creative: Modern and unique style
  - Vibrant: Colorful and energetic design
- Real-time resume preview
- PDF export functionality
- Drag-and-drop section reordering
- Responsive design
- Auto-save functionality
- Form validation
- Error handling

## Tech Stack

- Frontend: React.js with TypeScript
- State Management: Redux Toolkit
- Styling: Tailwind CSS
- Backend: Firebase
- Authentication: Firebase Auth
- Database: Firestore
- PDF Generation: html2pdf.js
- UI Components: Radix UI, Headless UI
- Icons: Lucide React



## Preview

![Dashboard](<Screenshot (1587).png>)
![Form Editing](<Screenshot (1588).png>)
![Creative Template](<Screenshot 2025-06-15 122222.png>)
![Vibrant Template](<Screenshot 2025-06-15 122253.png>)
![Modern Template](<Screenshot 2025-06-15 122548.png>)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd resume-builder
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Firebase configuration:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Start the development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── common/    # Common components (ErrorBoundary, etc.)
│   ├── resume/    # Resume-specific components
│   ├── templates/ # Resume templates
│   └── ui/        # UI components (Button, Card, etc.)
├── contexts/      # React contexts
├── hooks/         # Custom React hooks
├── pages/         # Page components
├── services/      # Firebase and other services
├── store/         # Redux store configuration
├── styles/        # Global styles and CSS
├── types/         # TypeScript type definitions
└── utils/         # Utility functions
```

## Features in Detail

### Resume Templates
- **Modern**: A clean, professional design with a focus on readability and modern aesthetics
- **Classic**: A traditional layout with serif fonts and formal styling
- **Creative**: A unique design with diagonal elements and timeline-style sections
- **Vibrant**: A colorful template with gradient backgrounds and modern styling

### Resume Sections
- Personal Information
- Work Experience
- Education
- Skills
- Projects
- Certifications

### User Features
- Real-time preview of resume changes
- Drag-and-drop section reordering
- PDF export with customizable zoom
- Auto-save functionality
- Form validation and error handling
- Responsive design for all screen sizes

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

