const info = () => `Hello, world!`

const allUsers = async (_parent, _args, { prisma }) => {
  const everyone = await prisma.user.findMany()

  console.log(everyone)

  return everyone
}

module.exports = {
  info,
  allUsers,
}
