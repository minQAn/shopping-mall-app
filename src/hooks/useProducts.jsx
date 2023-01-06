// This Hook is to improve managing everything
// you read and update in one place.
// becasue I need to check if I used staleTime,
// then need to invalidate it accordingly.
// it makes so hard

/* Most Important using custom hooks: 
  -> Seperate UI / Business Logic 
*/

// https://tkdodo.eu/blog/practical-react-query#create-custom-hooks
/*
You can keep the actual data fetching out of the ui, but co-located with your useQuery call.
You can keep all usages of one query key (and potentially type definitions) in one file.
If you need to tweak some settings or add some data transformation, you can do that in one place.
*/

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProducts as fetchProducts, addNewProduct } from '../api/firebase';

const PRODUCTS_QUERY_KEY = 'products';

export default function useProducts() {
  const queryClient = useQueryClient();

  const productsQuery = useQuery(
    [PRODUCTS_QUERY_KEY], // key
    fetchProducts,
    {
      staleTime: 1000 * 60,
    }
  ); // samea as () => fetchProducts()

  // { product, url } object parameter coming from where you use 'mutate' ex) NewProduct
  const addProduct = useMutation(
    ({ product, url }) => addNewProduct(product, url),
    {
      onSuccess: () => queryClient.invalidateQueries([PRODUCTS_QUERY_KEY]),
    }
  );

  return { productsQuery, addProduct };
}
