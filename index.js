/*
 * @Author: 刘原
 * @Date: 2022-05-07 12:12:59
 * @Description: 处理css中url
 * @LastEditors: 刘原
 * @LastEditTime: 2022-05-11 22:02:51
 * @FilePath: /gulp-css-urlpath/index.js
 */
const rework = require("rework");
const reworkUrl = require("rework-plugin-url");
const through = require("through2");
const path = require("path");

module.exports = function (options) {
    let root = options && options.root ? options.root : process.cwd();
    const rootPath = options && options.rootPath ? options.rootPath : "";
    const cdnPath = options && options.cdnPath ? options.cdnPath : "";

    if (/\.\//.test(root) || /\.\.\//.test(root)) {
        root = path.join(process.cwd(), root);
    }

    function convertUrls(css, fileDir) {
        return rework(css)
            .use(reworkUrl(function (url) {
                if (/^http:\/\//.test(url) || /^https:\/\//.test(url) || url.indexOf("data:") === 0 || url.indexOf("about:") === 0) {
                    return url;
                }
                url = url.replace(/^\s*([^\s]*)\s*$/, "$1");
                let newUrl = url;
                if (/\.\//.test(url) || /\.\.\//.test(url) || !/^\//.test(url)) { // 相对路径, ./images, ../images;非绝对路径，eg: 'images/xxx'
                    newUrl = path.join(fileDir, url);
                }
                if (rootPath && !/^\//.test(url)) {
                    newUrl = rootPath + newUrl;
                }
                newUrl = cdnPath + newUrl;
                return newUrl.replace(/\\/gim, "/");
            }))
            .toString({
                compress: true
            });
    }


    return through.obj(function (file, enc, cb) {
        if (file.contents) {
            try {
                let css = file.contents.toString();
                const filePath = file.path;
                if (/\.css$/.test(filePath)) {
                    css = convertUrls(css, path.dirname(filePath).replace(root.replace(/(\/|\\)$/, ""), "").replace(/\\/gim, "/"));
                }
                file.contents = new Buffer(css);
                this.push(file);
            } catch (error) {
                console.log("error-file-path:" + file.path);
                throw error;
            }
        }
        cb();
    });
};
