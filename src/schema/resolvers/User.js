const todos = ({ id }, _args, { prisma }) =>
  prisma.user.findOne({ where: { id } }).todos()

module.exports = {
  todos,
}
