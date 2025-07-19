import Article from './models/task.model'

export const resolvers = {
  Query: {
    hello: () => {
      return 'Toàn đẹp trai'
    },
    getListArticle: async () => {
      const articles = await Article.find({
        deleted: false,
      })

      return articles
    },
  },
}
