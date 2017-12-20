module.exports = {
    root: true,
    env: {
        browser: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:vue/recommended"
    ],
    rules: {
        "vue/max-attributes-per-line": [2, {
            "singleline": 3,
            "multiline": {
                "max": 1,
                "allowFirstLine": false
            }
        }],
        "vue/html-indent": ["error", 4]
    }
}