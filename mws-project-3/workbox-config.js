module.exports = {
  "globDirectory": ".",
  "globPatterns": [
    "**/*.{html,css,js}",
    "manifest.json",
    "img/touch/*.png"
  ],
  "globIgnores": [
    "sw.src.js",
    "workbox-config.js",
    "node_modules/**/*"
  ],
  "swSrc": "sw.src.js",
  "swDest": "sw.js"
};
