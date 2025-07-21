import User from '../models/user.model'
import md5 from 'md5'
import * as generateHelper from '../helper/generate'
export const resolversUser = {
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
  },
}
