import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useInfiniteQuery} from '@tanstack/react-query';
import React from 'react';
import {getProductsByPage} from '../../../actions/product/get-products-by-page';
import {ProductList} from '../../components/products/ProductList';
import {FABComponent} from '../../components/ui/FAB';
import {FullScreenLoader} from '../../components/ui/FullScreenLoader';
import {MainLayout} from '../../layout/MainLayout';
import {RootStackParams} from '../../navigation/StackNavigator';

//* Cuando estamos trabajando con un set de componentes diferentes como React Native UI Kitten en vez de View se utilizan Layout
export const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  // const {isLoading, data: products = []} = useQuery({
  //   queryKey: ['products', 'infinite'],
  //   staleTime: 1000 * 60 * 60, //1hour
  //   queryFn: () => getProductsByPage(0),
  // });

  const {isLoading, data, fetchNextPage} = useInfiniteQuery({
    queryKey: ['products', 'infinite'],
    staleTime: 1000 * 60 * 60, //1hour
    initialPageParam: 0,

    queryFn: async params => {
      // console.log(params);
      const products = await getProductsByPage(params.pageParam);
      return products;
    },

    getNextPageParam: (lastPage, allPage) => allPage.length,
  });

  getProductsByPage(0);

  return (
    <>
      <MainLayout
        title="TesloShop - Products"
        subTitle="Aplicacion administrativa">
        {isLoading ? (
          <FullScreenLoader />
        ) : (
          <ProductList
            products={data?.pages.flat() ?? []}
            fetchNextPage={fetchNextPage}
          />
        )}
      </MainLayout>

      <FABComponent
        iconName="save-outline"
        onPress={() => navigation.navigate('ProductScreen', {productId: 'new'})}
        style={{
          position: 'absolute',
          bottom: 30,
          right: 20,
        }}
      />
    </>
  );
};
