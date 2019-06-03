const withTypescript = require('@zeit/next-typescript')
const withImages = require('next-images')
module.exports = withTypescript(withImages())