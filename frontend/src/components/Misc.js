import React, { useContext } from 'react'
import CategoryContext from '../context/category/categoryContext'
import BrandContext from '../context/brand/brandContext'
import OrderContext from '../context/orders/orderContext'
import productContext from '../context/product/productContext'
import UserContext from '../context/user/UserContext'
import AlertMessage from './AlertMessage'
import Loader from './Loader'

const Misc = () => {
  // for product context
  const pContext = useContext(productContext)
  const { productsLoading, productsMessage, productsError } = pContext

  // for category context
  const cContext = useContext(CategoryContext)
  const { categoriesError, categoriesLoading, categoriesMessage } = cContext

  // for brand context
  const bContext = useContext(BrandContext)
  const { brandsError, brandsLoading, brandsMessage } = bContext

  // for user context
  const uContext = useContext(UserContext)
  const { userError, userLoading, userMessage } = uContext

  // for order context
  const oContext = useContext(OrderContext)
  const { ordersError, ordersLoading, ordersMessage } = oContext

  return (
    <div>
      {/* for products  */}
      {productsLoading && <Loader />}
      {productsError && (
        <AlertMessage variant={productsError.variant}>
          {productsError.message}
        </AlertMessage>
      )}
      {productsMessage && (
        <AlertMessage variant={productsMessage.variant}>
          {productsMessage.message}
        </AlertMessage>
      )}

      {/* for categories  */}
      {categoriesLoading && <Loader />}
      {categoriesError && (
        <AlertMessage variant={categoriesError.variant}>
          {categoriesError.message}
        </AlertMessage>
      )}
      {categoriesMessage && (
        <AlertMessage variant={categoriesMessage.variant}>
          {categoriesMessage.message}
        </AlertMessage>
      )}

      {/* for Brands  */}
      {brandsLoading && <Loader />}
      {brandsError && (
        <AlertMessage variant={brandsError.variant}>
          {brandsError.message}
        </AlertMessage>
      )}
      {brandsMessage && (
        <AlertMessage variant={brandsMessage.variant}>
          {brandsMessage.message}
        </AlertMessage>
      )}

      {/* for users */}
      {userLoading && <Loader />}
      {userError && (
        <AlertMessage variant={userError.variant}>
          {userError.message}
        </AlertMessage>
      )}
      {userMessage && (
        <AlertMessage variant={userMessage.variant}>
          {userMessage.message}
        </AlertMessage>
      )}

      {/* for orders  */}
      {ordersLoading && <Loader />}
      {ordersError && (
        <AlertMessage variant={ordersError.variant}>
          {ordersError.message}
        </AlertMessage>
      )}
      {ordersMessage && (
        <AlertMessage variant={ordersMessage.variant}>
          {ordersMessage.message}
        </AlertMessage>
      )}
    </div>
  )
}

export default Misc
