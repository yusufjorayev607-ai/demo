// -------------------------------------------------------
// 1-QADAM: package.json yaratish
// -------------------------------------------------------
npm init -y

// -------------------------------------------------------
// 2-QADAM: Webpack o'rnatish
// -------------------------------------------------------
npm install --save-dev webpack webpack-cli webpack-dev-server

// -------------------------------------------------------
// 3-QADAM: Pluginlar o'rnatish
// -------------------------------------------------------
npm install --save-dev html-webpack-plugin mini-css-extract-plugin css-loader

// -------------------------------------------------------
// 4-QADAM: Papka strukturasi yaratish
// -------------------------------------------------------
mkdir -p src/js src/css src/images

// -------------------------------------------------------
// 5-QADAM: VSCode chap panelda fayllarni yarating
// src/
// ├── js/
// │   ├── main.js
// │   └── abaut.js
// ├── css/
// │   └── style.css
// ├── indextemp.html
// └── abauttemp.html
// webpack.config.js  ← src dan TASHQARIDA
// -------------------------------------------------------

// -------------------------------------------------------
// 6-QADAM: src/js/main.js
// -------------------------------------------------------
import '../css/style.css'
console.log('Main ishlayapti')

// -------------------------------------------------------
// 7-QADAM: src/js/abaut.js
// -------------------------------------------------------
import '../css/style.css'
console.log('About ishlayapti')

// -------------------------------------------------------
// 8-QADAM: src/indextemp.html
// -------------------------------------------------------
<!DOCTYPE html>
<html lang="uz">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><%= htmlWebpackPlugin.options.title %></title>
</head>
<body>
  <h1>Bosh Sahifa</h1>
</body>
</html>

// -------------------------------------------------------
// 9-QADAM: src/abauttemp.html
// -------------------------------------------------------
<!DOCTYPE html>
<html lang="uz">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><%= htmlWebpackPlugin.options.title %></title>
</head>
<body>
  <h1>About Sahifasi</h1>
</body>
</html>

// -------------------------------------------------------
// 10-QADAM: webpack.config.js
// -------------------------------------------------------
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {

  // build rejimi: development = tez build, xatolar ko'rinadi
  mode: 'development',

  // kirish nuqtalari: har bir sahifa uchun alohida JS fayl
  entry: {
    main:  path.resolve(__dirname, 'src/js/main.js'),  // index.html uchun
    about: path.resolve(__dirname, 'src/js/abaut.js')  // about.html uchun
  },

  // [name] = entry dagi kalit nomi (main, about)
  // [contenthash] = fayl o'zgarganda brauzer keshini yangilaydi
  // clean: true = har build oldidan /public/ ni tozalaydi
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].[contenthash].js',
    clean: true
  },

  // port: 3000 = http://localhost:3000
  // open: true = brauzer avtomatik ochiladi
  // hot: true = sahifa yangilanmasdan o'zgarishlar ko'rinadi
  // compress: true = gzip siqish yoqiladi
  // historyApiFallback: true = SPA da 404 bo'lsa index.html qaytaradi
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'public')
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true
  },

  module: {
    rules: [
      // css-loader = @import va url() ni hal qiladi
      // MiniCssExtractPlugin.loader = CSS ni JS dan ajratib .css faylga yozadi
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      // Rasm loader: png, jpg, svg fayllarni /public/images/ ga ko'chiradi
      {
        test: /\.(png|jpg|jpeg|gif|svg|ico)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]'
        }
      },
    ],
  },

  plugins: [
    // template = shablon fayl, filename = /public/ ga yoziladigan fayl
    // chunks: ['main'] = faqat main.js ulanadi
    new HtmlWebpackPlugin({
      title: 'Countries | Home',
      template: './src/indextemp.html',
      filename: 'index.html',
      chunks: ['main']
    }),

    // chunks: ['about'] = faqat about.js ulanadi, main.js emas
    new HtmlWebpackPlugin({
      title: 'Countries | About',
      template: './src/abauttemp.html',
      filename: 'about.html',
      chunks: ['about']
    }),

    // CSS larni JS dan ajratib alohida .css faylga yozadi
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
  ]
}

// -------------------------------------------------------
// 11-QADAM: package.json — "scripts" ni o'zgartiring
// dev = serverni ishga tushiradi
// build = /public/ ga tayyor fayllar yozadi
// -------------------------------------------------------
"scripts": {
  "dev": "webpack serve --config webpack.config.js",
  "build": "webpack --config webpack.config.js"
},

// -------------------------------------------------------
// 12-QADAM: Serverni ishga tushirish
// -------------------------------------------------------
npm run dev

// -------------------------------------------------------
// 13-QADAM: Production build
// -------------------------------------------------------
npm run build
