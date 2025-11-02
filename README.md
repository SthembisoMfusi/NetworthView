# NetworthView - Personal Finance Tracker

A comprehensive full-stack web application for personal finance tracking built with Next.js, TypeScript, PostgreSQL, and Prisma. This project demonstrates modern web development practices including secure authentication, complex data handling, data visualization, third-party API integration, and comprehensive testing.

## 🎯 Project Overview

NetworthView is a portfolio project designed to showcase expertise across the full web development stack. It provides users with tools to track income, expenses, budgets, and visualize their financial data through interactive charts.

### Key Features

**Phase 1: MVP (Complete)**
- ✅ Secure user authentication with Auth.js
- ✅ Transaction CRUD operations (Income/Expense tracking)
- ✅ Category management
- ✅ Dashboard with financial summaries
- ✅ Date range and category filtering

**Phase 2: Professional Features**
- 📊 Interactive data visualization (Recharts)
- 💰 Monthly budget tracking with progress indicators
- 🔄 Recurring transaction automation

**Phase 3: Advanced Features**
- 🏦 Bank account integration with Plaid
- 📥 Automatic transaction import
- 🧪 Comprehensive test suite (Unit, Integration, E2E)

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | Next.js 14+ (React) | Server-side rendering and API routes |
| Database | PostgreSQL (Neon) | Reliable transactional data storage |
| ORM | Prisma | Type-safe database access |
| Authentication | Auth.js (NextAuth.js) | Secure user sessions |
| Styling | Tailwind CSS | Modern, responsive UI |
| Visualization | Recharts | Financial data charts |
| Testing | Jest, RTL, Cypress | Comprehensive test coverage |
| Type Safety | TypeScript (strict) | Compile-time safety |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (Neon, Supabase, or local)
- (Optional) Plaid API credentials for Phase 3

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/NetworthView.git
   cd NetworthView
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your credentials:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/networthview"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   ```

4. **Generate Prisma Client**
   ```bash
   npm run db:generate
   ```

5. **Run database migrations**
   ```bash
   npm run db:push
   ```

6. **Seed the database (optional)**
   ```bash
   npm run db:seed
   ```

7. **Start the development server**
   ```bash
   npm run dev
   ```

8. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Default Test Account

After seeding:
- Email: `test@example.com`
- Password: `password123`

## 📁 Project Structure

```
/
├── prisma/                    # Database schema and migrations
│   ├── schema.prisma         # Complete data model
│   └── seed.ts               # Database seeding script
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── api/              # API routes
│   │   │   ├── auth/         # Authentication endpoints
│   │   │   ├── transactions/ # Transaction CRUD
│   │   │   ├── budgets/      # Budget management
│   │   │   ├── categories/   # Category CRUD
│   │   │   ├── recurring/    # Recurring transactions
│   │   │   ├── plaid/        # Plaid integration
│   │   │   └── dashboard/    # Dashboard data
│   │   ├── dashboard/        # Dashboard page
│   │   └── transactions/     # Transactions page
│   ├── components/           # React components
│   │   ├── auth/             # Authentication UI
│   │   ├── dashboard/        # Dashboard components
│   │   ├── transactions/     # Transaction components
│   │   ├── charts/           # Chart components
│   │   └── ui/               # Reusable UI components
│   ├── lib/                  # Utility functions
│   │   ├── prisma.ts         # Prisma client
│   │   ├── auth.ts           # Auth.js config
│   │   ├── calculations/     # Financial calculations
│   │   ├── plaid/            # Plaid utilities
│   │   └── utils/            # General utilities
│   └── types/                # TypeScript types
├── __tests__/                # Test files
│   ├── unit/                 # Unit tests
│   ├── integration/          # Integration tests
│   └── e2e/                  # End-to-end tests
└── cypress/                  # Cypress configuration
```

## 🧪 Testing

### Run All Tests

```bash
npm run test:all
```

### Run Specific Test Suites

```bash
# Unit tests only
npm run test

# Unit tests with watch mode
npm run test:watch

# Test coverage
npm run test:coverage

# End-to-end tests (interactive)
npm run test:e2e

# E2E tests (headless)
npm run test:e2e:headless
```

## 📚 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run test` | Run unit tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Generate coverage report |
| `npm run test:e2e` | Open Cypress UI |
| `npm run test:all` | Run all test suites |
| `npm run db:generate` | Generate Prisma Client |
| `npm run db:push` | Push schema to database |
| `npm run db:migrate` | Create and run migration |
| `npm run db:seed` | Seed database |
| `npm run db:studio` | Open Prisma Studio |

## 🔐 Security Features

- Secure password hashing with bcrypt
- HTTP-only authentication cookies
- CSRF protection
- Input validation and sanitization
- SQL injection prevention via Prisma
- XSS prevention

## 🌐 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy automatically

### Database Setup

For production, use a managed PostgreSQL service:
- [Neon](https://neon.tech) - Serverless PostgreSQL
- [Supabase](https://supabase.com) - Open-source Firebase alternative
- [Railway](https://railway.app) - Easy PostgreSQL hosting

## 📖 Documentation

Each major directory contains its own README with detailed documentation:
- [Prisma Configuration](./prisma/README.md)
- [Type Definitions](./src/types/README.md)
- [Calculation Functions](./src/lib/calculations/README.md)
- [Utility Functions](./src/lib/utils/README.md)
- [Plaid Integration](./src/lib/plaid/README.md)
- [Transactions API](./src/app/api/transactions/README.md)
- [Authentication API](./src/app/api/auth/[...nextauth]/README.md)

## 🤝 Contributing

This is a portfolio project, but suggestions and feedback are welcome!

## 📄 License

ISC License - See LICENSE file for details

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) - React framework
- [Prisma](https://www.prisma.io) - Modern ORM
- [Auth.js](https://authjs.dev) - Authentication
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS
- [Recharts](https://recharts.org) - Charting library
- [Plaid](https://plaid.com) - Financial data API

