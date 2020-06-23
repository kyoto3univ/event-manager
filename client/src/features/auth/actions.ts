import { action, actions } from '@fleur/fleur';
import { User } from 'firebase';

export const AuthActions = actions('Auth', {
  setUser: action<{ user?: User }>(),
  emailRequestStarted: action(),
  emailRequestSuccess: action(),
  emailRequestFailed: action(),
  callbackInvalid: action(),
  callbackSuccess: action(),
  claimsUpdate: action<{ admin: boolean; editor: boolean }>(),
});
