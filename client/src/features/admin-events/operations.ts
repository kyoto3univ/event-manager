import { operations } from '@fleur/fleur';
import { firestore } from 'firebase/app';
import { eventDocumentConverter } from '../../firebase/models/Event';
import { AdminEventsActions } from './actions';

const fs = firestore();
export const AdminEventsOps = operations({
  async getEventList(
    { dispatch },
    userId: string,
    limit = 10,
    from?: firestore.DocumentSnapshot,
  ) {
    let query = await fs
      .collection('/events')
      .withConverter(eventDocumentConverter)
      .where('editors', 'array-contains', userId)
      .orderBy('startAt')
      .limit(limit);

    if (from) query = query.startAfter(from);

    const snapshot = await query.get();
    const items = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    dispatch(AdminEventsActions.addListItems, { items, snapshot });
  },
});
