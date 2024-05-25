import {Button, Input, Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {useWindowDimensions} from 'react-native';

import {StackScreenProps} from '@react-navigation/stack';
import {ScrollView} from 'react-native-gesture-handler';
import {MyIcon} from '../../components/ui/MyIcon';
import {RootStackParams} from '../../navigation/StackNavigator';

// Aca tomamos la navegacion
interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> {}

export const RegisterScreen = ({navigation}: Props) => {
  const {height} = useWindowDimensions();

  return (
    <Layout style={{flex: 1}}>
      {/* Aca usamos screollview para que el texto y el teclado se pueda mover de acorde a la posicion de los inputs */}
      <ScrollView style={{marginHorizontal: 40}}>
        <Layout style={{paddingTop: height * 0.3}}>
          <Text category="h1">Crear cuenta</Text>
          <Text category="p2">Por favor, crea una cuenta para continuar </Text>
        </Layout>

        {/* Inouts */}
        <Layout style={{marginTop: 20}}>
          <Input
            placeholder="Nombre completo"
            accessoryLeft={<MyIcon name="person-outline" />}
            style={{marginBottom: 10}}
          />
          <Input
            placeholder="Correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
            accessoryLeft={<MyIcon name="email-outline" />}
            style={{marginBottom: 10}}
          />
          <Input
            placeholder="Contraseña"
            autoCapitalize="none"
            accessoryLeft={<MyIcon name="lock-outline" />}
            secureTextEntry
            style={{marginBottom: 10}}
          />
        </Layout>

        {/* Sapace */}
        <Layout style={{height: 10}} />

        {/* Button */}
        <Layout>
          <Button
            accessoryRight={<MyIcon name="arrow-forward-outline" white />}
            onPress={() => {}}
            // appearance="ghost"
          >
            Crear
          </Button>
        </Layout>

        {/* Informacion para crear cuenta */}
        <Layout style={{height: 50}} />

        <Layout
          style={{
            alignItems: 'flex-end',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text>¿Ya tienes cuenta?</Text>
          <Text
            status="primary"
            category="s1"
            onPress={() => navigation.goBack()}>
            {' '}
            Ingresar{' '}
          </Text>
        </Layout>
      </ScrollView>
    </Layout>
  );
};
