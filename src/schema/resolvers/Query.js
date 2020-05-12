const info = () => `Hello, world!`

const allUsers = async (_parent, _args, { prisma }) => {
  const everyone = await prisma.user.findMany()

  return everyone
}

module.exports = {
  info,
  allUsers,
}
