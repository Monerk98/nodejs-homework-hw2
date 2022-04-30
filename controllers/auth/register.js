const { User } = require('../../models')
const fs = require('fs/promises')
const path = require('path')
const gravatar = require('gravatar')
const { nanoid } = require('nanoid')
const { sendMail } = require('../../helpers')

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
    const verificationToken = nanoid()
    const newUser = new User({ email, avatarURL, verificationToken })
    newUser.setPassword(password)
    await newUser.save()
    const mail = {
      to: email,
      subject: 'Confirming of registration',
      html: `<a href="http://localhost:3000/api/auth/verify/${verificationToken}">Press to confirm your email</a>`,
    }
    await sendMail(mail)
    const avatarFolder = path.join(avatarsDir, String(newUser._id))
    await fs.mkdir(avatarFolder)
    res.status(201).json({
      status: 'success',
      code: 201,
      message: 'Register success. Please confirm your email!'
    })
  } catch (error) {
    next(error)
  }
}

module.exports = register
