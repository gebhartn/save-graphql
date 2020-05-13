export const info = () => `Hello, world!`

export const allUsers = async (_parent, _args, { prisma }) => {
  const everyone = await prisma.user.findMany()

  return everyone
}
