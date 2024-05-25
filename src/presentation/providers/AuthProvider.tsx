import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {PropsWithChildren, useEffect} from 'react';
import {RootStackParams} from '../navigation/StackNavigator';
import {useAuthStore} from '../store/auth/useAuthStore';

// Este authProvider no es una pantalla aunque puede que tenga acesso usualmente esto no va a estar como una pantalla
export const AuthProvider = ({children}: PropsWithChildren) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const {checkStatus, status} = useAuthStore();

  useEffect(() => {
    checkStatus();
  }, []);

  useEffect(() => {
    if (status !== 'checking') {
      if (status === 'authenticated') {
        navigation.reset({
          index: 0,
          routes: [{name: 'HomeScreen'}],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{name: 'LoginScreen'}],
        });
      }
    }
  }, [status]);

  return <>{children}</>;
};
