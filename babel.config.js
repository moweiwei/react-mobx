module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: '2',
        useBuiltIns: 'entry',
        targets: ['> 5%', 'ie 9'],
        modules: 'commonjs',
        exclude: ['proposal-dynamic-import'],
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    [
      'transform-imports',
      {
        lodash: {
          transform: 'lodash/${member}',
          preventFullImport: true,
        },
        'components/Base': {
          transform: 'components/Base/${member}',
          preventFullImport: true,
        },
      },
    ],
    'recharts',
    [
      "import",
      {
        "libraryName": "antd",
        "libraryDirectory": "lib",
        "style": true
      },
      "antd"
    ],
    [
      "import",
      {
        "libraryName": "@ant-design/icons",
        "libraryDirectory": "es/icons",
        "camel2DashComponentName": false
      },
      "@ant-design/icons"
    ]
  ],
  env: {
    production: {
      plugins: [
        [
          'transform-react-remove-prop-types',
          {
            removeImport: true,
            ignoreFilenames: ['node_modules'],
          },
        ],
      ],
    },
  },
}
