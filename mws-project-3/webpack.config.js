const autoprefixer = require('autoprefixer');

module.exports = [
  {
    entry: './app/sass/styles.scss',
    output: {
      // This is necessary for webpack to compile
      // But we never use style-bundle.js
      filename: './tmp/style-bundle.js',
    },
    module: {
      rules: [{
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: './app/css/styles-bundle.min.css',
            },
          },
          { loader: 'extract-loader' },
          { loader: 'css-loader',
            options: {
              minimize: true || {/* CSSNano Options */}
            } 
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer()],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['./node_modules'],
            }
          },
        ]
      }]
    },
  },
  {
    entry: "./app/js/resto-info.js",
    output: {
      filename: "./app/js/resto-bundle.js"
    }
  },
  {
    entry: "./app/js/review.js",
    output: {
      // filename: "./app/js/review-bundle.min.js"
      filename: "./app/js/review-bundle.js"
    },
    module: {
      loaders: [{
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['env']
        }
      }]
    }
  }
];
