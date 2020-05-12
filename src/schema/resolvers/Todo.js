const author = ({ id }, args, { prisma }) => {
  const author = prisma.post.findOne({ where: { id } }).author()

  return author
}

module.exports = { author }
