import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import { wrapper } from "../redux/store";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);

global.stringFirstToUpper  = (string) => {
  const firstLetter = string.charAt(0).toUpperCase();
  return firstLetter + string.slice(1);
}

global.backendUrl = `http://localhost:8088`;
