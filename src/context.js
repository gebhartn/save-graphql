const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const context = ({ req, res }) => ({ prisma, req, res })

module.exports = { context }
