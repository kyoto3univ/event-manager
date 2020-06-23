import { operations } from '@fleur/fleur';
import { auth } from 'firebase/app';
import { AuthActions } from './actions';

const COMPLETE_URL =
  process.env.LOGIN_COMPLETE_URL || `${location.origin}/login/callback`;

const authInstance = auth();
export const AuthOps = operations({
  async startEmailLogin({ dispatch }, email: string) {
    dispatch(AuthActions.emailRequestStarted, {});
    try {
      localStorage.setItem('email', email);
      await authInstance.sendSignInLinkToEmail(email, {
        url: COMPLETE_URL,
        handleCodeInApp: true,
      });

      dispatch(AuthActions.emailRequestSuccess, {});
    } catch (e) {
      dispatch(AuthActions.emailRequestFailed, {});
    }
  },
  async startAuthMonitor({ dispatch }) {
    authInstance.onIdTokenChanged(user => {
      if (user) {
        dispatch(AuthActions.setUser, { user });
      } else {
        dispatch(AuthActions.setUser, {});
      }
    });
  },
  async finalizeEmailLogin({ dispatch }, href: string) {
    if (!authInstance.isSignInWithEmailLink(href)) {
      dispatch(AuthActions.callbackInvalid, {});
      return;
    }

    const email = localStorage.getItem('email');
    if (!email) {
      dispatch(AuthActions.callbackInvalid, {});
      return;
    }

    try {
      const result = await authInstance.signInWithEmailLink(email, href);
      if (result.user) {
        dispatch(AuthActions.setUser, { user: result.user });
      }

      localStorage.removeItem('email');

      dispatch(AuthActions.callbackSuccess, {});
    } catch (e) {
      dispatch(AuthActions.callbackInvalid, {});
    }
  },
});
