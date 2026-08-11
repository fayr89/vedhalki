import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import Catalog from "../pages/catalog/page";
import ProductPage from "../pages/product/page";
import Cart from "../pages/cart/page";
import Checkout from "../pages/checkout/page";
import OrderSuccess from "../pages/order-success/page";
import Orders from "../pages/orders/page";
import Login from "../pages/login/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/catalog",
    element: <Catalog />,
  },
  {
    path: "/product/:id",
    element: <ProductPage />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/order-success/:id",
    element: <OrderSuccess />,
  },
  {
    path: "/orders",
    element: <Orders />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;