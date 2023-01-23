/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true
}
process.env.REDUX_DEVTOOLS = "off"

module.exports = nextConfig
  