# 🎯 AcePrep AI - AI-Powered Interview Preparation Platform

<div align="center">
  <img src="public/logo.svg" alt="AcePrep AI Logo" width="200" height="100">
  
  <p>Master your interview skills with AI-powered practice sessions and personalized feedback.</p>
  
  [![Next.js](https://img.shields.io/badge/Next.js-14.2.8-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![Vercel](https://img.shields.io/badge/Vercel-deployed-black?style=for-the-badge&logo=vercel)](https://vercel.com/)
</div>

## 🚀 Features

### 🎯 **AI-Powered Mock Interviews**
- Realistic interview scenarios powered by Google Gemini AI
- Personalized questions based on your role and experience
- Real-time feedback and performance analysis

### 📊 **Smart Analytics**
- Track your progress with detailed performance metrics
- Identify strengths and areas for improvement
- Historical data and trends analysis

### 🔐 **Secure Authentication**
- Seamless sign-in/sign-up with Clerk authentication
- Protected routes for personalized experiences
- Multi-factor authentication support

### 🎨 **Modern UI/UX**
- Beautiful, responsive design with Tailwind CSS
- Dark/light mode support
- Smooth animations and transitions
- Mobile-first approach

### 🗄️ **Robust Data Management**
- PostgreSQL database with Neon
- Efficient queries with Drizzle ORM
- Real-time data synchronization

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React

### **Backend**
- **API**: Next.js API Routes
- **Authentication**: Clerk
- **Database**: PostgreSQL (Neon)
- **ORM**: Drizzle ORM
- **AI**: Google Gemini AI

### **Developer Tools**
- **Language**: JavaScript/TypeScript
- **Linting**: ESLint
- **Code Formatting**: Prettier
- **Version Control**: Git

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn** package manager
- **PostgreSQL** database (we recommend Neon)
- **Clerk** account for authentication
- **Google Gemini AI** API key

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/aceprep-ai.git
   cd aceprep-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

   # Database (Neon PostgreSQL)
   NEXT_PUBLIC_DRIZZLE_DB_URL=your_postgresql_connection_string

   # Google Gemini AI
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key

   # Interview Settings
   NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT=5
   ```

4. **Set up the database**
   ```bash
   npm run db:push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🌐 Environment Setup

### **Clerk Authentication Setup**
1. Create a Clerk account at [clerk.com](https://clerk.com)
2. Create a new application
3. Copy the API keys to your `.env.local` file
4. Configure sign-in/sign-up URLs in Clerk dashboard

### **Database Setup (Neon)**
1. Create a Neon account at [neon.tech](https://neon.tech)
2. Create a new PostgreSQL database
3. Copy the connection string to your `.env.local` file
4. Run database migrations with `npm run db:push`

### **Google Gemini AI Setup**
1. Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add the API key to your `.env.local` file
3. Configure the AI model settings in `utils/GeminiAiModels.js`

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:push` | Push database schema |
| `npm run db:studio` | Open Drizzle Studio |

## 🚀 Deployment

### **Vercel Deployment (Recommended)**

1. **Deploy to Vercel**
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Set environment variables**
   - Go to your Vercel dashboard
   - Navigate to Settings → Environment Variables
   - Add all environment variables from `.env.local`

3. **Configure domains**
   - Set up your custom domain in Vercel dashboard
   - Configure DNS settings

### **Other Deployment Options**
- **Netlify**: Follow their Next.js deployment guide
- **Railway**: Connect your GitHub repository
- **DigitalOcean**: Use their App Platform
- **Docker**: Build and deploy with Docker containers

## 🏗️ Project Structure

```
aceprep-ai/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Utility functions
│   ├── globals.css        # Global styles
│   ├── layout.js          # Root layout
│   └── page.js            # Home page
├── components/            # Reusable UI components
│   ├── ui/               # Shadcn/ui components
│   ├── Header.js         # Navigation header
│   ├── Hero.js           # Hero section
│   ├── Features.js       # Features section
│   └── ...
├── lib/                  # Library configurations
├── public/               # Static assets
├── utils/                # Database and AI utilities
├── drizzle.config.js     # Database configuration
├── middleware.js         # Next.js middleware
├── next.config.mjs       # Next.js configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── package.json          # Dependencies and scripts
```

## 🎨 Design System

### **Colors**
- **Primary**: Purple (`#8B5CF6`)
- **Secondary**: Pink (`#EC4899`)
- **Accent**: Yellow (`#F59E0B`)
- **Background**: White (`#FFFFFF`)
- **Text**: Gray (`#374151`)

### **Typography**
- **Primary Font**: Geist Sans
- **Monospace**: Geist Mono
- **Headings**: Bold, gradient text effects
- **Body**: Regular, high contrast

### **Components**
- **Buttons**: Rainbow gradient, hover effects
- **Cards**: Subtle shadows, rounded corners
- **Forms**: Clean inputs, validation states
- **Animations**: Smooth transitions, blob animations

## 🔐 Security

### **Authentication**
- ✅ Secure authentication with Clerk
- ✅ Protected routes and middleware
- ✅ Session management
- ✅ Multi-factor authentication ready

### **Data Protection**
- ✅ Environment variables for sensitive data
- ✅ Database connection encryption
- ✅ API key rotation support
- ✅ Input validation and sanitization

### **Best Practices**
- ✅ HTTPS enforcement
- ✅ CORS configuration
- ✅ Rate limiting ready
- ✅ Error handling and logging

## 📊 Performance

### **Optimization**
- ✅ Next.js Image optimization
- ✅ Static generation where possible
- ✅ Dynamic imports for code splitting
- ✅ Lazy loading for components

### **Monitoring**
- ✅ Built-in Next.js analytics
- ✅ Performance metrics tracking
- ✅ Error boundary implementation
- ✅ SEO optimization

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### **Development Guidelines**
- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📞 Support

Need help? We're here for you:

- **Documentation**: Check our [Wiki](https://github.com/your-username/aceprep-ai/wiki)
- **Issues**: [GitHub Issues](https://github.com/your-username/aceprep-ai/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/aceprep-ai/discussions)
- **Email**: support@aceprep.ai

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js** team for the amazing framework
- **Clerk** for seamless authentication
- **Tailwind CSS** for beautiful styling
- **Google** for Gemini AI
- **Neon** for PostgreSQL database
- **Vercel** for deployment platform

---

<div align="center">
  <p>Made with ❤️ by the AcePrep AI team</p>
  <p>
    <a href="https://aceprep.ai">Website</a> •
    <a href="https://twitter.com/aceprep_ai">Twitter</a> •
    <a href="https://linkedin.com/company/aceprep-ai">LinkedIn</a>
  </p>
</div>
