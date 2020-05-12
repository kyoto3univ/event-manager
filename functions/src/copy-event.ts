import { database } from 'firebase-admin';
import { region } from 'firebase-functions';
import { isRight } from 'fp-ts/lib/Either';
import { eventDocumentIo } from './models/Event';
export const copyEvent = region('asia-northeast1')
  .firestore.document('/events/{eventId}')
  .onWrite(async (change) => {
    const dbEntity = database().ref('events').child(change.after.id);

    if (change.after.exists) {
      const docData = eventDocumentIo.decode(change.after.data());

      if (isRight(docData) && docData.right.published) {
        await dbEntity.set(docData.right);
      } else {
        await dbEntity.remove();
      }
    } else {
      await dbEntity.remove();
    }
  });
