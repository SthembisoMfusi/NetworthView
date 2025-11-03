import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

/**
 * Seed script for Populating the database with initial data
 * 
 * This script creates:
 * - A test user account
 * - Sample categories
 * - Sample transactions
 * - Sample budgets
 * - Sample recurring transactions
 * 
 * Usage: npm run db:seed
 */

async function main() {
  console.log('Starting seed...')

  // Create a test user
  const hashedPassword = await bcrypt.hash('password123', 10)
  
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
      password: hashedPassword,
    },
  })

  console.log('Created user:', user.email)

  // Create categories
  const incomeCategory = await prisma.category.upsert({
    where: { 
      name_userId: {
        name: 'Salary',
        userId: user.id
      }
    },
    update: {},
    create: {
      name: 'Salary',
      type: 'INCOME',
      icon: '💰',
      color: '#10B981',
      userId: user.id,
    },
  })

  const foodCategory = await prisma.category.upsert({
    where: { 
      name_userId: {
        name: 'Food & Dining',
        userId: user.id
      }
    },
    update: {},
    create: {
      name: 'Food & Dining',
      type: 'EXPENSE',
      icon: '🍔',
      color: '#F59E0B',
      userId: user.id,
    },
  })

  const transportCategory = await prisma.category.upsert({
    where: { 
      name_userId: {
        name: 'Transport',
        userId: user.id
      }
    },
    update: {},
    create: {
      name: 'Transport',
      type: 'EXPENSE',
      icon: '🚗',
      color: '#3B82F6',
      userId: user.id,
    },
  })

  console.log('Created categories')

  // Create sample transactions
  const transactions = [
    {
      amount: 5000,
      type: 'INCOME' as const,
      date: new Date('2024-01-15'),
      note: 'Monthly salary',
      userId: user.id,
      categoryId: incomeCategory.id,
    },
    {
      amount: 85.50,
      type: 'EXPENSE' as const,
      date: new Date('2024-01-20'),
      note: 'Grocery shopping',
      userId: user.id,
      categoryId: foodCategory.id,
    },
    {
      amount: 45.00,
      type: 'EXPENSE' as const,
      date: new Date('2024-01-21'),
      note: 'Uber rides',
      userId: user.id,
      categoryId: transportCategory.id,
    },
    {
      amount: 120.00,
      type: 'EXPENSE' as const,
      date: new Date('2024-01-22'),
      note: 'Restaurant dinner',
      userId: user.id,
      categoryId: foodCategory.id,
    },
    {
      amount: 5000,
      type: 'INCOME' as const,
      date: new Date('2024-02-15'),
      note: 'Monthly salary',
      userId: user.id,
      categoryId: incomeCategory.id,
    },
  ]

  for (const transaction of transactions) {
    await prisma.transaction.create({
      data: transaction,
    })
  }

  console.log(`Created ${transactions.length} transactions`)

  // Create a budget
  const budget = await prisma.budget.create({
    data: {
      categoryId: foodCategory.id,
      limit: 500,
      period: 'MONTHLY' as const,
      userId: user.id,
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
    },
  })

  console.log('Created budget:', budget.id)

  // Create a recurring transaction
  const recurringTransaction = await prisma.recurringTransaction.create({
    data: {
      amount: 5000,
      type: 'INCOME' as const,
      categoryId: incomeCategory.id,
      note: 'Monthly salary',
      frequency: 'MONTHLY' as const,
      nextDate: new Date('2024-03-15'),
      userId: user.id,
      isActive: true,
    },
  })

  console.log('Created recurring transaction:', recurringTransaction.id)

  console.log('Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('Error during seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

