import { database } from 'firebase-admin';
import { region } from 'firebase-functions';

export const copyEvent = region('asia-northeast1')
  .firestore.document('/events/{eventId}')
  .onWrite(async (change) => {
    if (change.after) {
      const docData = change.after.data();
      const dbEntity = database().ref('events').child(change.after.id);
      if (docData) {
        await dbEntity.update(docData);
      } else {
        await dbEntity.remove();
      }
    } else {
      const dbEntity = database().ref('events').child(change.before.id);
      await dbEntity.remove();
    }
  });
