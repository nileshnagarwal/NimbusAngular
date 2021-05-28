/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  baseUrl: 'http://127.0.0.1:8000',
  firebase: {
    apiKey: 'AIzaSyB7NGkd5NEMNXCLgRNNbNs8hl-A-mYfvzo',
    authDomain: 'nimbusapp-fbase-msg.firebaseapp.com',
    databaseURL: 'https://nimbusapp-fbase-msg.firebaseio.com',
    projectId: 'nimbusapp-fbase-msg',
    storageBucket: 'nimbusapp-fbase-msg.appspot.com',
    messagingSenderId: '577996256183',
    appId: '1:577996256183:web:bb3e2694064076a2736e32',
    measurementId: 'G-CBP5PDNZDR',
  },
};
