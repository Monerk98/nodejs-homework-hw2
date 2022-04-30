const { sendMail } = require('../../helpers')
const { User } = require('../../models')

const repeatVerify = async (req, res) => {
  const { email } = req.body

  if (!email) {
    res.status(400).json({
      status: 'missing required field email',
      code: 400,
    })
    return
  }

  const currentUser = await User.findOne({ email })
  if (!currentUser) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: 'User not found',
    })
    return
  }
  if (!currentUser.verificationToken) {
    res.status(401).json({
      status: 'Unauthorized',
      code: 401,
    })
    return
  }
  const resendMail = {
    to: email,
    subject: 'Confirming of registration',
    html: `<a href="http://localhost:3000/api/auth/verify/${currentUser.verificationToken}">Press to confirm your email</a>`,
  }
  await sendMail(resendMail)
  res.json({
    status: 'success',
    code: 200,
    message: 'Verification email has sent',
  })
}

module.exports = repeatVerify
