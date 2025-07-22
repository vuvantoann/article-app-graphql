import User from '../models/user.model'
import md5 from 'md5'
import * as generateHelper from '../helper/generate'
export const resolversUser = {
  Query: {
    getUser: async (_, args, context) => {
      const infoUser = await User.findOne({
        token: context['user'].token,
        deleted: false,
      })

      if (infoUser) {
        return {
          code: 200,
          message: 'Thành công',
          id: infoUser.id,
          fullName: infoUser.fullName,
          email: infoUser.email,
          token: infoUser.token,
        }
      } else {
        return {
          code: 400,
          message: 'Thất bại',
        }
      }
    },
  },
  Mutation: {
    registerUser: async (_, args) => {
      const { user } = args

      const emailExist = await User.findOne({ email: user.email })

      if (emailExist) {
        return {
          code: 400,
          message: 'Email đã tồn tại',
        }
      } else {
        user.password = md5(user.password)
        const newUser = new User({
          fullName: user.fullName,
          email: user.email,
          password: user.password,
          token: generateHelper.generateRandomString(30),
        })

        const data = await newUser.save()

        return {
          code: 200,
          message: 'tạo tài khoản thành công',
          id: data.id,
          fullName: data.fullName,
          email: data.email,
          token: data.token,
        }
      }
    },

    loginUser: async (_, args) => {
      const { user } = args

      const infoUser = await User.findOne({
        email: user.email,
        deleted: false,
      })
      if (!infoUser) {
        return {
          code: 400,
          message: 'Email không tồn tại',
        }
      }

      if (infoUser.password != md5(user.password)) {
        return {
          code: 400,
          message: 'Sai mật khẩu',
        }
      }

      if (infoUser.status === 'inactive') {
        return {
          code: 400,
          message: 'Tài khoản đã bị khóa',
        }
      }

      return {
        code: 200,
        message: 'Đăng nhập thành công',
        id: infoUser.id,
        fullName: infoUser.fullName,
        email: infoUser.email,
        token: infoUser.token,
      }
    },
  },
}
