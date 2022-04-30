const register = require('./register')
const login = require('./login')
const logout = require('./logout')
const getCurrentUser = require('./getCurrentUser')
const updateAvatar = require('./updateAvatar')
const verify = require('./verify')
const resendVerify = require('./resendVerify')

module.exports = { register, login, logout, getCurrentUser, updateAvatar, verify, resendVerify }
