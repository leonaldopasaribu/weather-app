# 🌤️ Weather App

A modern, responsive weather application built with Next.js that provides real-time weather information with a beautiful and intuitive interface.

## ✨ Features

- 🌍 **Real-time Weather Data** - Get current weather conditions for any location
- 📱 **Fully Responsive** - Perfect experience on desktop, tablet, and mobile devices
- 🎨 **Beautiful UI** - Clean and modern interface with smooth animations
- 🌡️ **Detailed Information** - Temperature, humidity, wind speed, and more
- 🔍 **Location Search** - Easily search for weather in any city worldwide
- ⚡ **Fast Performance** - Optimized with Next.js for lightning-fast load times
- 🌙 **Theme Support** - Comfortable viewing experience

## 📸 Screenshots

### Desktop View

<img width="1470" height="688" alt="Desktop Weather App" src="https://github.com/user-attachments/assets/dc8e381c-e5ea-4740-960a-2e8c4d41ab49" />

### Mobile View

<div align="center">
  <img src="https://github.com/user-attachments/assets/69cec894-282c-4004-8a2f-cb64145c0c0f" alt="Mobile Weather App" width="30%" />
  <img src="https://github.com/user-attachments/assets/8a14245d-e8cb-4f76-ad39-42a285c892f8" alt="Mobile Weather Details" width="30%" />
  <img src="https://github.com/user-attachments/assets/2cdbe8cb-43ee-4ed9-aef2-bf3ff8693b95" alt="Mobile Weather Search" width="30%" />
</div>

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) - React framework for production
- **Language:** [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Testing:** [Jest](https://jestjs.io/) - JavaScript testing framework
- **Package Manager:** [pnpm](https://pnpm.io/) - Fast, disk space efficient
- **Font:** [Geist](https://vercel.com/font) - Optimized font by Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- pnpm (recommended) or npm/yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/leonaldopasaribu/weather-app.git
   cd weather-app
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   # Add your API keys here
   NEXT_PUBLIC_WEATHER_API_KEY=your_api_key_here
   ```

4. **Run the development server**

   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🧪 Testing

Run the test suite:

```bash
pnpm test
# or
npm test
```

## 📦 Versioning & Releases

This project uses [standard-version](https://github.com/conventional-changelog/standard-version) for automated versioning and changelog generation.

### Commit Message Format

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**

- `feat:` - A new feature
- `fix:` - A bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, semicolons, etc.)
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Adding or updating tests
- `chore:` - Build process or auxiliary tool changes

**Examples:**

```bash
feat(air-quality): add Air Quality API integration
fix(weather): correct temperature display issue
docs(readme): update installation instructions
```

### Creating a Release

```bash
# Automatically determine version bump based on commits
pnpm release

# Create a specific version bump
pnpm release:patch  # 0.1.0 → 0.1.1
pnpm release:minor  # 0.1.0 → 0.2.0
pnpm release:major  # 0.1.0 → 1.0.0

# First release (for new projects)
pnpm release:first
```

### What happens during a release:

1. ✅ Bumps version in `package.json`
2. ✅ Generates/updates `CHANGELOG.md`
3. ✅ Creates a git commit
4. ✅ Creates a git tag

### Push your release:

```bash
git push --follow-tags origin main
```

## 📝 Development

The application uses:

- **App Router** - Next.js 13+ app directory structure
- **TypeScript** - Full type safety across the codebase
- **Jest** - Unit and integration testing
- **ESLint** - Code quality and consistency
- **Prettier** - Code formatting

## 🌐 Deployment

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/leonaldopasaribu/weather-app)

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 📚 Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - Interactive Next.js tutorial
- [Tailwind CSS](https://tailwindcss.com/docs) - Utility-first CSS framework
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - TypeScript documentation

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Leonaldo Pasaribu**

- GitHub: [@leonaldopasaribu](https://github.com/leonaldopasaribu)
- LinkedIn: [Leonaldo Pasaribu](https://linkedin.com/in/leonaldo-pasaribu)

---

<div align="center">
  Made with ❤️ using Next.js
</div>
