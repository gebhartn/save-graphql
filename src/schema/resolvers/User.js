const todos = (parent, _args, { prisma }) =>
  prisma.user.findOne({ where: { id: parent.id } }).todos()

module.exports = {
  todos,
}
