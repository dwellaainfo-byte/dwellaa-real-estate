// Temporary mock database for deployment
// Will be replaced with real Prisma client once database is set up

export const prisma = {
  user: {
    findUnique: () => Promise.resolve(null),
    create: () => Promise.resolve(null),
    update: () => Promise.resolve(null),
  }
} as any;