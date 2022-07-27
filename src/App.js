import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { sendCartData, fetchCartData } from './store/cart-actions';

let isInitial = true;

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector(({ ui }) => ui.notification);

  const dispatch = useDispatch();

  //* Alternative option instead of Using an Action Creator Thunk
  // useEffect(() => {
  //   const sendCartData = async () => {
  //     dispatch(
  //       uiActions.showNotification({
  //         status: 'pending',
  //         title: 'Sending...',
  //         message: 'Sending cart data!',
  //       })
  //     );
  //     const response = await fetch(
  //       'https://redux-cart-b5344-default-rtdb.firebaseio.com/cart.json',
  //       {
  //         method: 'PUT',
  //         body: JSON.stringify(cart),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error('Sending cart data failed!');
  //     }

  //     dispatch(
  //       uiActions.showNotification({
  //         status: 'success',
  //         title: 'Success!',
  //         message: 'Sent cart data successfully!',
  //       })
  //     );
  //   };

  //   if (isInitial) {
  //     isInitial = false;
  //     return;
  //   }

  //   sendCartData().catch(() => {
  //     dispatch(
  //       uiActions.showNotification({
  //         status: 'error',
  //         title: 'Error!',
  //         message: 'Sending cart data failed!',
  //       })
  //     );
  //   });
  // }, [cart, dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]); //adding for completeness sake (dispatch will never change so this useState will never rerun)

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
