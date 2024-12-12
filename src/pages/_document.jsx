import { ColorModeScript } from "@chakra-ui/react";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";

import colorMode from "@/theme/colorMode";

class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head></Head>
        <body>
          <ColorModeScript
            initialColorMode={colorMode.config.initialColorMode}
          />

          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
