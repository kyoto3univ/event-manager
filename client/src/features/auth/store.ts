import { reducerStore } from '@fleur/fleur';
import { User } from 'firebase';
import { AuthActions } from './actions';

interface State {
  user: User | null;
  loggedIn: boolean;
  initialized: boolean;
  isAdmin: boolean;
  isEditor: boolean;
  // Login
  emailError: boolean;
  emailSending: boolean;
  emailSent: boolean;
  // Callback
  callbackProceeded: boolean;
  callbackInvalid: boolean;
}

export const AuthStore = reducerStore<State>('AuthStore', () => ({
  emailError: false,
  emailSending: false,
  emailSent: false,
  initialized: false,
  user: null,
  loggedIn: false,
  callbackInvalid: false,
  callbackProceeded: false,
  isAdmin: false,
  isEditor: false,
}))
  .listen(AuthActions.emailRequestStarted, state => {
    state.emailSending = true;
    state.emailError = false;
    state.emailSent = false;
  })
  .listen(AuthActions.emailRequestSuccess, state => {
    state.emailSending = false;
    state.emailError = false;
    state.emailSent = true;
  })
  .listen(AuthActions.emailRequestFailed, state => {
    state.emailSending = false;
    state.emailError = true;
    state.emailSent = false;
  })
  .listen(AuthActions.setUser, (state, { user }) => {
    if (user && user.emailVerified) {
      state.user = user;
      state.loggedIn = true;
    } else {
      state.user = null;
      state.loggedIn = false;
    }
    state.initialized = true;
  })
  .listen(AuthActions.callbackInvalid, state => {
    state.callbackProceeded = true;
    state.callbackInvalid = true;
  })
  .listen(AuthActions.callbackSuccess, state => {
    state.callbackProceeded = true;
  })
  .listen(AuthActions.claimsUpdate, (state, claims) => {
    state.isAdmin = claims.admin;
    state.isEditor = claims.admin || claims.editor;
  });
