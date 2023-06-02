import bcrypt from 'bcrypt'

const hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
const checkPasswordHash = (password, hash) => bcrypt.compareSync(password, hash)

export { hashPassword, checkPasswordHash }
