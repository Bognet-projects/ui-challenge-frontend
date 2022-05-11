module.exports = {
    module: {
        rules: [
            {
                test: /\.s(c|a)ss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                            additionalData: "@import '@/styles/variables.scss';"
                        }
                    }
                ]
            }
        ]
    }
}
