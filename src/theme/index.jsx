import { extendTheme } from "@chakra-ui/react";

const styles = {
  global: {
    "html, body": {
      fontFamily:
        "Poppins, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      fontSize: "18px",
    },
  },
};

const fonts = {
  heading: "Poppins, -apple-system",
  body: "Poppins, -apple-system",
};

const theme = extendTheme({
  styles,
  fonts,
});

export default theme;
