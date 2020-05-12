const register = (_parent, { email, password }, { prisma }) => {
  return prisma.user.create({ data: { email, password } })
}

module.exports = { register }
