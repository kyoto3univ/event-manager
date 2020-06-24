import { operations } from '@fleur/fleur';
import { firestore } from 'firebase/app';
import { eventDocumentWithIdConverter } from '../../firebase/models/Event';
import { AdminEventsActions } from './actions';

const fs = firestore();
export const AdminEventsOps = operations({
  async getEventList(
    { dispatch },
    userId?: string,
    limit?: number,
    from?: firestore.DocumentSnapshot,
  ) {
    let query = await fs
      .collection('/events')
      .withConverter(eventDocumentWithIdConverter)
      .orderBy('startAt');

    if (userId) query = query.where('editors', 'array-contains', userId);
    if (limit) query = query.limit(limit);
    if (from) query = query.startAfter(from);

    const snapshot = await query.get();
    const items = snapshot.docs.map(doc => doc.data());

    dispatch(AdminEventsActions.addListItems, { items, snapshot });
  },
});
