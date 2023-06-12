import "../app/globals.css";
import { wrapper, store } from "../store/store";
import { Provider } from "react-redux";
function MyApp({ Component, pageProps }: any) {

  const getLayout = Component.getLayout || ((page: any) => page);
  return getLayout(
    <>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
