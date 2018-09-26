# Firebase integration
Make sure to include a credentials file at the root level /src folder. File should looks as follows:

```javascript
export const credentials = {
  firebase: {
    apiKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    authDomain: 'txxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    databaseURL: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    projectId: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    storageBucket: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    messagingSenderId: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  },
  jumio: {
    api_token: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    api_secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  },
};
```

Be sure to install node modules in functions folder before trying to use. You will also need to install firebase cli tools.


# CSS compilation
In order to generate CSS files based on SCSS files included in the project, run the following script:
```
npm run watch-css
```
or
```
yarn watch-css
```
This will create CSS files right next to the source SCSS files.

## Ant Design theming
Antd Less variables can be overriden in `theme/antd/antd-overrides.less` file. In order to regenerate the `src/css/antd.css` with updated variables, simply run `build-antd-css` script:
```
npm run build-antd-css
```
or
```
yarn build-antd-css
```


## Build app and deploy
```
yarn build
```
```
firebase deploy --only hosting:prod
```

