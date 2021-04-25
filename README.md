- Node.js 12.18+ ([installation with nvm](https://github.com/creationix/nvm#usage))
- Yarn 1.22.4+

Feature

- react
- webpack 4.x
- mobx
- antd
- less
- Login page demo
- i18n
- eslint
- prettier
- pre-commit, lint-staged
- commitlint
- unit test demo
- e2e test demo

Install yarn with npm:

```sh
npm install -g yarn
```

Fork the repository, then clone your repository and install the dependencies:

```sh
yarn
```

Note: If you are in China Mainland, execute the following command before running the command above for faster installation.

```sh
yarn config set registry https://registry.npm.taobao.org
```

### Start for development

```sh
yarn start
```

Now, you can access http://localhost:8088.

### i18next-scanner

Add translates in /locales/zh.json after run `yarn i18n`

```sh
yarn i18n
```

### Run tests

```sh
yarn test
```

### Build for production

The project can be built for production by using the following task:

```sh
yarn build
```
