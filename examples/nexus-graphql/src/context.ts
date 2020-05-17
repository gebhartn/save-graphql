import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export interface Context {
  req: Request
  res: Response
  prisma: PrismaClient
}

export const context = ({ req, res }: any): Context => ({ req, res, prisma })
