"use client";

import { Provider } from "react-redux";

import LayoutWrapper from "./LayoutWrapper";
import { store } from "./redux-toolkit/store";

const Wrapper = ({ children }: any) => (
  <Provider store={store}>
    <LayoutWrapper>{children}</LayoutWrapper>
  </Provider>
);

export default Wrapper;
