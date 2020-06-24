import { action, actions } from '@fleur/fleur';
import { firestore } from 'firebase';
import { EventDocumentWithId } from '../../firebase/models/Event';

export const AdminEventsActions = actions('AdminEvents', {
  addListItems: action<{
    items: EventDocumentWithId[];
    snapshot: firestore.QuerySnapshot;
  }>(),
});
