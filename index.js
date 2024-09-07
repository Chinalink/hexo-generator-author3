'use strict'

hexo.config.author_generator = Object.assign(
  {
    per_page: typeof hexo.config.per_page === 'undefined' ? 10 : hexo.config.per_page,
  },
  hexo.config.author_generator,
)

hexo.extend.generator.register('author', require('./lib/generator'))
