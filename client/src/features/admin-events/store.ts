import { reducerStore } from '@fleur/fleur';
import { firestore } from 'firebase/app';
import { EventDocumentWithId } from '../../firebase/models/Event';
import { AdminEventsActions } from './actions';

interface State {
  events: EventDocumentWithId[];
  latestSnapshot: firestore.QuerySnapshot | null;
}

export const AdminEventsStore = reducerStore<State>('AdminEventsStore', () => ({
  events: [],
  latestSnapshot: null,
})).listen(AdminEventsActions.addListItems, (state, { items, snapshot }) => {
  state.events.push(...items);
  state.latestSnapshot = snapshot;
});
