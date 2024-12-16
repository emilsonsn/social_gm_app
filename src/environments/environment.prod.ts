declare const require: any;

export const environment = {
  production: false,
  appName: 'Frontend App',
  home: '/painel',
  // api: 'http://127.0.0.1:8000/api',
  wsUrl: 'ws://127.0.0.1:6001/app/local',
  api: 'https://social.guimadureira.com:3001/api',
  version: require('../../package.json').version
};
