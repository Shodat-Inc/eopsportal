import "../app/globals.css";
function MyApp({ Component, pageProps } : any) {

  const getLayout = Component.getLayout || ((page:any) => page);
  return getLayout(<Component {...pageProps} />);
}

export default MyApp;
