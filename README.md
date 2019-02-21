# Dev Environment
- node: v8.12.0
- Firebase:
  - Make sure to include a credentials file at the root level /src folder. File should looks as follows:
  ```javascript
  export const credentials = {
    firebase: {
      apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      authDomain: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      databaseURL: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      projectId: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      storageBucket: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      messagingSenderId: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    },
  };
  ```

# Debugging
- ```yarn install```
- ```yarn start```

## Ant Design theming

Antd Less variables can be overriden in `theme/antd/antd-overrides.less` file. In order to regenerate the `src/css/antd.css` with updated variables, simply run `build-antd-css` script:

```
npm run build-antd-css
```

or

```
yarn build-antd-css
```

## Deployment

1.  Install Firebase CLI Tools
2.  Build: ```yarn build```
3.  Deploy:
    1.  odin-dev.firebaseapp.com: ```yarn deploy-dev```
    2.  odin-stg.firebaseapp.com: ```yarn deploy-stage```
    3.  odin-sandbox.gothor.com: ```yarn deploy-sandbox```
    3.  odin.gothor.com: ```yarn deploy-prod```
