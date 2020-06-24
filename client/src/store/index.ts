import Fleur, { withReduxDevTools } from '@fleur/fleur';
import { AdminEventsStore } from '../features/admin-events';
import { AuthStore } from '../features/auth';

const app = new Fleur({
  stores: [AuthStore, AdminEventsStore],
});

export const store = withReduxDevTools(app.createContext());
