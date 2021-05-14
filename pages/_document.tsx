import React from "react";
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from "@material-ui/core/styles";

export default class MyDocument extends  Document {

  static async getInitialProps(ctx) {
    const sheets = new ServerStyleSheets();
    const originalPageRender = ctx.renderPage;

    ctx.renderPage = () => originalPageRender({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props}/>)
    });

    const initialProps = await Document.getInitialProps(ctx)
    return {
      ...initialProps,
      styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()]
    };
  };

  render() {
    return (
      <Html>
        <Head></Head>
        <body>
          <Main/>
          <NextScript/>
        </body>
      </ Html>
    );
  };
};
  