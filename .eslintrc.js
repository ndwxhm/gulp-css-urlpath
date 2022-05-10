/*
 * @Author: 刘原
 * @Date: 2022-04-24 14:53:27
 * @Description:
 * @LastEditors: 刘原
 * @LastEditTime: 2022-04-24 14:53:28
 * @FilePath: /gulp-hash/.eslintrc.js
 */
module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: ["standard", "prettier"],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
    },
    rules: {
        indent: ["error", 4, { SwitchCase: 1 }],
        semi: ["error", "always"],
        quotes: ["error", "double", { allowTemplateLiterals: true }]
    }
};
