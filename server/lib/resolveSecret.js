import fs from 'fs'

const resolveSecret = () => fs.readFileSync(`${__dirname}/../config/secret`, 'utf8').trim()

export default resolveSecret
