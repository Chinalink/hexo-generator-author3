'use.strict'

const pagination = require('hexo-pagination')

module.exports = function (locals) {
  const config = this.config
  const perPage = config.author_generator.per_page
  const paginationDir = config.pagination_dir || 'page'
  const orderBy = config.author_generator.order_by || '-date'

  const authors = []
  if (locals.posts.length) {
    locals.posts.map(post => {
      if (post.author && !authors.includes(post.author)) {
        authors.push(post.author)
      }
    })
  }

  return authors.reduce((result, author) => {
    if (!author.length) return result

    const posts = locals.posts.filter(post => post.author == author).sort(orderBy)
    const authorDir = `authors/${author}/`
    const data = pagination(authorDir, posts, {
      perPage,
      layout: ['author', 'archive', 'index'],
      format: `${paginationDir}/%d/`,
      data: {
        author,
      },
    })
    return result.concat(data)
  }, [])
}
