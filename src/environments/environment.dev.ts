declare const require: any;

export const environment = {
  production: false,
  appName: 'Frontend App',
  home: '/painel',
  // api: 'http://127.0.0.1:8000/api',
  api: 'https://social.guimadureira.com:3001/api',
  wsUrl:'',
  version: require('../../package.json').version
};

