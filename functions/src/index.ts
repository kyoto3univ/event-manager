import 'firebase-functions';

import * as admin from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: `https://${process.env.GCLOUD_PROJECT}.firebaseio.com`,
  databaseAuthVariableOverride: {
    uid: 'functions',
  },
});

export * from './users';
export * from './copy-event';
