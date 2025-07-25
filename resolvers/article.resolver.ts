import Category from '../models/category.model'
import Article from '../models/task.model'

export const resolversArticle = {
  Query: {
    getListArticle: async (_, args) => {
      const {
        sortKey,
        sortValue,
        currentPage,
        limitItem,
        filterKey,
        filterValue,
        keyword,
      } = args
      const find = {
        deleted: false,
      }
      // sắp xếp theo tiêu chí
      let sort = {}
      if (sortKey && sortValue) {
        sort[sortKey] = sortValue
      }
      // kết thúc

      // phân trang
      const skip = (currentPage - 1) * limitItem
      // kết thúc

      // bộ lọc
      if (filterKey && filterValue) {
        find[filterKey] = filterValue
      }
      // end
      if (keyword) {
        const keywordRegex = new RegExp(keyword, 'i')
        find['title'] = keywordRegex
      }
      // tìm kiếm

      // kết thúc
      const articles = await Article.find(find)
        .sort(sort)
        .limit(limitItem)
        .skip(skip)

      return articles
    },

    getArticle: async (_, args) => {
      const { id } = args
      const article = await Article.findOne({
        _id: id,
        deleted: false,
      })

      return article
    },
  },

  Article: {
    category: async (article) => {
      const categoryId = article.categoryId

      const category = await Category.findOne({
        _id: categoryId,
        deleted: false,
      })

      return category
    },
  },

  Mutation: {
    createArticle: async (_, args) => {
      const { article } = args

      const record = new Article(article)
      await record.save()
      return record
    },
    deleteArticle: async (_, args) => {
      const { id } = args

      await Article.updateOne(
        {
          _id: id,
        },
        {
          deleted: true,
          deletedAt: new Date(),
        }
      )
      return 'Đã Xóa'
    },

    updateArticle: async (_, args) => {
      const { id, article } = args

      await Article.updateOne(
        {
          _id: id,
          deleted: false,
        },
        article
      )

      const record = await Article.findOne({
        _id: id,
        deleted: false,
      })
      return record
    },
  },
}
