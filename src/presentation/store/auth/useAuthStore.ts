import {create} from 'zustand';
import {authCheckstatus, authLogin} from '../../../actions/auth/auth';
import {StorageAdapter} from '../../../config/adapters/async-storage';
import {User} from '../../../domain/entities/user';
import {AuthStatus} from '../../../infrastructure/interfaces/auth.status';

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;

  login: (email: string, password: string) => Promise<boolean>;
  checkStatus: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  status: 'checking',
  token: undefined,
  user: undefined,

  login: async (email: string, password: string) => {
    const resp = await authLogin(email, password);
    if (!resp) {
      set({status: 'unauthenticated', token: undefined, user: undefined});
      return false;
    }

    // Save token and user in storage
    await StorageAdapter.setItem('token', resp.token);
    // const storeToken = await StorageAdapter.getItem('token');
    // console.log({storeToken});
    // console.log({resp});

    set({status: 'authenticated', token: resp.token, user: resp.user});

    return true;
  },

  checkStatus: async () => {
    const resp = await authCheckstatus();
    if (!resp) {
      set({status: 'unauthenticated', token: undefined, user: undefined});
      return;
    }
    await StorageAdapter.setItem('token', resp.token);
    set({status: 'authenticated', token: resp.token, user: resp.user});
  },

  logout: async () => {
    await StorageAdapter.removeItem('token');
    set({status: 'unauthenticated', token: undefined, user: undefined});
  },
}));
