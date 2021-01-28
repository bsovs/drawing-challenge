module.exports = {
  globDirectory: './build/',
  globPatterns: [
    '\*\*/\*.{html,js,png,ico,css,json,svg}'
  ],
  swDest: './build/service-worker.js',
  clientsClaim: true,
  skipWaiting: true
};