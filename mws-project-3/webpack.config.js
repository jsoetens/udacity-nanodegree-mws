const autoprefixer = require('autoprefixer');

module.exports = [
  {
    entry: './app/sass/mdc.scss',
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
              name: './app/css/mdc-bundle.min.css',
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
    entry: "./app/js/mdc.js",
    output: {
      filename: "./app/js/mdc-bundle.js"
    },
    module: {
      loaders: [{
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['env']
        }
      }]
    },
  }
];
