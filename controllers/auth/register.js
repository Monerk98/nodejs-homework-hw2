const { User } = require('../../models')
const fs = require('fs/promises')
const path = require('path')
const gravatar = require('gravatar')

const avatarsDir = path.join(__dirname, '../../public/avatars')

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const avatarURL = gravatar.url(email, { protocol: 'http' })
    const user = await User.findOne({ email })
    if (user) {
      res.status(409).json({
        status: `User with email=${email} already exist`,
        code: 409
      })
    }
    const newUser = new User({ email, avatarURL })
    newUser.setPassword(password)
    newUser.save()
    const avatarFolder = path.join(avatarsDir, String(newUser._id))
    await fs.mkdir(avatarFolder)
    res.status(201).json({
      status: 'success',
      code: 201,
      message: 'register success'
    })
  } catch (error) {
    next(error)
  }
}

module.exports = register
