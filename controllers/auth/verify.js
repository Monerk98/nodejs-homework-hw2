const { User } = require('../../models')

const verify = async (req, res) => {
  const { verificationToken } = req.params
  const user = await User.findOne({ verificationToken })
  if (!user) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: 'User not found'
    })
    return
  }
  await User.findByIdAndUpdate(user._id, {
    verificationToken: null,
    verify: true,
  })
  res.json({
    message: 'Verification successful',
  })
}

module.exports = verify
