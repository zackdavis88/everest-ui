import { AppProps } from "next/app";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import theme from "../src/theme";
import {useStore} from "../src/store/store";

export default function App({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
};
