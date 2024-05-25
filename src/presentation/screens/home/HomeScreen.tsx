import {Button, Icon, Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {useAuthStore} from '../../store/auth/useAuthStore';

//* Cuando estamos trabajando con un set de componentes diferentes como React Native UI Kitten en vez de View se utilizan Layout
export const HomeScreen = () => {
  const {logout} = useAuthStore();
  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>HomeScreen</Text>
      {/* <Icon name="facebook" /> */}
      <Button onPress={logout} accessoryLeft={<Icon name="log-out-outline" />}>
        Cerrar sesión
      </Button>
    </Layout>
  );
};
