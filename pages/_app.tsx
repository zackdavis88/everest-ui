import { AppProps } from "next/app";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import theme from "../src/theme";
import {useStore} from "../src/store/store";
import Navbar from "../src/components/Navbar/Navbar";
import Notification from "../src/components/Notification/Notification";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Navbar />
        <Notification />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
};
