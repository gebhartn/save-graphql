export const author = ({ id }, _args, { prisma }) => {
  const author = prisma.todo.findOne({ where: { id } }).author()

  return author
}
