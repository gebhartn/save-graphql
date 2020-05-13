import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const context = ({ req, res }) => ({ prisma, req, res })
