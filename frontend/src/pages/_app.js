import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import { wrapper } from "../redux/store";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

global.stringFirstToUpper = (string) => {
  if(typeof string === 'string'){
    const firstLetter = string.charAt(0).toUpperCase();
    return firstLetter + string.slice(1);
  }
  else return string;
}

global.backendUrl = `http://localhost:8088`;


export default wrapper.withRedux(MyApp);