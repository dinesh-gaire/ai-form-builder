# 🤖 AI Form Builder

## 🌟 Project Overview

AI Form Builder is a cutting-edge SaaS application designed to revolutionize form creation using artificial intelligence. Built with modern web technologies, this powerful tool enables users to generate, customize, and deploy intelligent forms with unprecedented ease.

## ✨ Key Features

- **🧠 AI-Powered Form Generation**: Create dynamic forms using Google Gemini API
- **🎨 Extensive Customization**: 
  - Modify form fields with over 20+ themes
  - Customize field types and descriptions
- **🔐 Robust Authentication**: 
  - Seamless login with Clerk
  - Support for social and email/password authentication
- **💾 Efficient Data Management**: 
  - Save and export form responses to Excel
  - PostgreSQL database integration with Drizzle ORM
- **👀 Live Form Preview**: Real-time form editing and preview
- **📱 Responsive Design**: Modern UI with TailwindCSS and DaisyUI

## 🛠 Technologies Powering the App

| Category | Technologies |
|----------|--------------|
| Frontend | Next.js, React, TailwindCSS, DaisyUI, Shadcn UI |
| Backend | PostgreSQL, Drizzle ORM |
| Authentication | Clerk |
| AI | Google Gemini API |
| Deployment | Vercel |

## 🚀 Quick Start Guide

### 1. Clone the Repository

```bash
git clone https://github.com/dinesh-gaire/ai-form-builder.git
cd ai-form-builder
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file with the following variables:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=your_sign_in_url
NEXT_PUBLIC_CLERK_SIGN_UP_URL=your_sign_up_url
NEXT_PUBLIC_DATABASE_URL_CONFIG=your_postgresql_database_url
NEXT_PUBLIC_GEMINI_API_KEY=your_google_gemini_api_key
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 4. Launch Development Server

```bash
npm run dev
```

## 🔍 Feature Deep Dive

### 1. Authentication Powered by Clerk
- Multiple login methods
- Secure route protection
- Seamless user session management

### 2. AI Form Generation
- Input form requirements
- Automatic field generation
- Intelligent form structuring

### 3. Customization Capabilities
- Field type modifications
- Theme selection
- Detailed field configurations

### 4. Response Management
- Instant database storage
- One-click Excel export
- Comprehensive response tracking

## 🤝 Contributing

Interested in contributing? We'd love your help!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

**Please ensure your code follows our existing style and passes all tests.**

## 📄 License

Distributed under the MIT License. See `LICENSE` file for more information.

## 🙏 Acknowledgements

- Google Gemini API
- Clerk Authentication
- Drizzle ORM
- PostgreSQL
- TailwindCSS & DaisyUI
- Shadcn UI

## 📞 Contact

For questions or support, reach out to the project maintainer:
[your-email@example.com](mailto:gairedinesh132@gmail.com)

---

**Built with ❤️ by AI Innovators**
