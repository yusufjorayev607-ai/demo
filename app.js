# 1-QADAM: package.json yaratish
npm init -y

# 2-QADAM: Webpack o'rnatish
npm install --save-dev webpack webpack-cli webpack-dev-server

# 3-QADAM: Pluginlar o'rnatish
npm install --save-dev html-webpack-plugin mini-css-extract-plugin css-loader

# 4-QADAM: Papka strukturasi yaratish
mkdir -p src/js src/css src/images

# 5-QADAM: VSCode da quyidagi fayllarni yarating (chap panelda)
# src/
# ├── js/
# │   ├── main.js
# │   └── abaut.js
# ├── css/
# │   └── style.css
# ├── indextemp.html
# └── abauttemp.html
# webpack.config.js  ← src dan TASHQARIDA, asosiy papkada

# 6-QADAM: src/js/main.js ichiga yozing
import '../css/style.css'
console.log('Main ishlayapti')

# 7-QADAM: src/js/abaut.js ichiga yozing
import '../css/style.css'
console.log('About ishlayapti')

# 8-QADAM: src/indextemp.html ichiga yozing
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

# 9-QADAM: src/abauttemp.html ichiga yozing
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

# 10-QADAM: webpack.config.js ichiga yozing (asosiy papkada)
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {

  # Loyiha rejimi: 'development' = xatolar aniq, tez build
  # Tayyor qilganda 'production' ga o'zgartiring
  mode: 'development',

  # Kirish nuqtalari: har bir sahifa uchun alohida JS fayl
  # main.js → index.html ga, abaut.js → about.html ga ulanadi
  entry: {
    main:  path.resolve(__dirname, 'src/js/main.js'),
    about: path.resolve(__dirname, 'src/js/abaut.js')
  },

  # Chiqish: build bo'lgan fayllar /public/ papkasiga yoziladi
  # [name] = main yoki about, [contenthash] = kesh yangilash uchun
  # clean: true = har build da eski fayllarni o'chiradi
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].[contenthash].js',
    clean: true
  },

  # Lokal server sozlamalari (npm run dev da ishlaydi)
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'public') # statik fayllar joyi
    },
    port: 3000,           # http://localhost:3000
    open: true,           # brauzer avtomatik ochiladi
    hot: true,            # o'zgarish bo'lsa sahifa yangilanmasdan yangilanadi
    compress: true,       # fayllarni gzip bilan siqadi, tezroq yuklaydi
    historyApiFallback: true  # SPA uchun: 404 da index.html qaytaradi
  },

  # Loaderlar: Webpack faqat JS ni tushunadi
  # CSS va rasmlarni ham tushunishi uchun qoidalar yoziladi
  module: {
    rules: [
      {
        test: /\.css$/i, # .css kengaytmali fayllarni ushlaydi
        # css-loader: @import va url() ni hal qiladi
        # MiniCssExtractPlugin.loader: CSS ni alohida faylga chiqaradi
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|ico)$/i, # rasm fayllarini ushlaydi
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]' # public/images/ papkasiga ko'chiradi
        }
      },
    ],
  },

  # Pluginlar: HTML yaratish va CSS ni ajratib chiqarish
  plugins: [

    # Birinchi HTML: index.html — faqat main.js ulanadi
    new HtmlWebpackPlugin({
      title: 'Countries | Home',
      template: './src/indextemp.html', # shablon fayl
      filename: 'index.html',           # public/ ga yoziladigan fayl
      chunks: ['main']                  # faqat main.js ni ulaydi
    }),

    # Ikkinchi HTML: about.html — faqat abaut.js ulanadi
    new HtmlWebpackPlugin({
      title: 'Countries | About',
      template: './src/abauttemp.html',
      filename: 'about.html',
      chunks: ['about']                 # faqat about.js ni ulaydi
    }),
      # CSS ni JS dan ajratib alohida .css fayl qiladi
    # [contenthash] = fayl o'zgarganda brauzer keshini yangilaydi
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
  ]
}

# 11-QADAM: package.json dagi "scripts" ni toping va o'zgartiring
# (package.json faylini oching, "scripts" qatorini quyidagicha qiling)
"scripts": {
  "dev": "webpack serve --config webpack.config.js",   # lokal server ishga tushadi
  "build": "webpack --config webpack.config.js"        # public/ papkasiga build qiladi
},

# 12-QADAM: Serverni ishga tushiring
npm run dev
# Brauzer avtomatik ochiladi → http://localhost:3000

# 13-QADAM: Production build (loyiha tayyor bo'lganda)
npm run build
# public/ papkasida tayyor fayllar paydo bo'ladi
