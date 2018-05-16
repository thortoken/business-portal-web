## Installation
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