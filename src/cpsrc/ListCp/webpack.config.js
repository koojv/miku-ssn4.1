module.exports = {
    //注意目录规范
    entry: {
            ListCp:["./index.js"]
           },
    output: {
        //输出目录
        path:"./",
        filename: "[name].bundle.js"
    },
    module: {
        //默认支持js，其余需要配置加载器
        loaders: [
            //用正则表达式匹配文件后缀，使用一系列加载器（解析器，注意顺序）加载
            { test: /\.scss$/, loader: "style!css!sass" },
            { test: /\.css$/, loader: "style!css" },
            //js文件都用jsx加载器加载，同时兼容js与jsx
            { test: /\.js$/, loader: "jsx" },
            //file-loader
            { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192'}
        ]
    }
};