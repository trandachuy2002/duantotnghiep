import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import CategoryState from './context/category/CategoryState'
import ProductState from './context/product/ProductState'
import BrandState from './context/brand/BrandState'
import UserState from './context/user/UserState'
import OrderState from './context/orders/OrderState'
import { BrowserRouter as Router } from 'react-router-dom'
import { CartProvider } from 'react-use-cart'
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from './redux/reducers/rootReducer'
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={ store }>
      <CartProvider>
        <Router>
          <UserState>
            <OrderState>
              <BrandState>
                <CategoryState>
                  <ProductState>
                    <App />
                  </ProductState>
                </CategoryState>
              </BrandState>
            </OrderState>
          </UserState>
        </Router>
      </CartProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
