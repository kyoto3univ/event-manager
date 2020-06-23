import Fleur, { withReduxDevTools } from '@fleur/fleur';
import { AuthStore } from '../features/auth';

const app = new Fleur({
  stores: [AuthStore],
});

export const store = withReduxDevTools(app.createContext());
