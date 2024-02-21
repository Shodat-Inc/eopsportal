import "../app/globals.css";
import { wrapper, store } from "../store/store";
import { Provider } from "react-redux";
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
let persistor = persistStore(store)

function MyApp({ Component, pageProps }: any) {
  const getLayout = Component.getLayout || ((page: any) => page);
  // let store = createStore(persistedReducer)
  // let persistor = persistStore(store)
  return getLayout(
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
