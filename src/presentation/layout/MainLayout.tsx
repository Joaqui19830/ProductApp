import {useNavigation} from '@react-navigation/native';
import {
  Button,
  Divider,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {MyIcon} from '../components/ui/MyIcon';
import {useAuthStore} from '../store/auth/useAuthStore';

// En el codigo limpio se preocura priorizar la composicion en lugar de la herencia porque la herencia es mas dificil de comprender
interface Props {
  title: string;
  subTitle?: string;

  rightAction?: () => void;
  rightActionIcon?: string;

  children?: React.ReactNode;
}

// Esto es un hair order component esto lo que hace es que recibe a otros componentes como hijos
export const MainLayout = ({
  title,
  subTitle,
  rightAction,
  rightActionIcon,
  children,
}: Props) => {
  const {logout} = useAuthStore();
  const {top} = useSafeAreaInsets();
  const {canGoBack, goBack} = useNavigation();

  const renderBackAction = () => {
    return (
      <TopNavigationAction
        onPress={goBack}
        icon={<MyIcon name="arrow-back-outline" />}
      />
    );
  };

  const RenderRightAction = () => {
    if (rightAction === undefined || rightActionIcon === undefined) {
      return null;
    }

    return (
      <TopNavigationAction
        onPress={rightAction}
        icon={<MyIcon name={rightActionIcon} />}
      />
    );
  };

  return (
    <Layout style={{paddingTop: top}}>
      <Button onPress={logout}>Salir</Button>
      <TopNavigation
        title={title}
        subtitle={subTitle}
        alignment="center"
        accessoryLeft={canGoBack() ? renderBackAction : undefined}
        accessoryRight={() => <RenderRightAction />}
      />

      <Divider />

      <Layout style={{height: '100%'}}>{children}</Layout>
    </Layout>
  );
};
