const todos = async (parent, _args, { prisma }) =>
  await prisma.user.findOne({ where: { id: parent.id } }).todos()

module.exports = {
  todos,
}
