import { extendTheme, ChakraProvider, Container } from "@chakra-ui/react";
import Header from "./components/Header";
import Main from "./components/Main";

const customTheme = {
  styles: {
    global: (props) => ({
      "html, body": {
        fontFamily: "Roboto Mono",
      },
    }),
  },
  colors: {
    brand: "#255849",
  },
};

const theme = extendTheme(customTheme);

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Container maxWidth="90%">
        <Header />
        <Main />
      </Container>
    </ChakraProvider>
  );
}

export default App;
