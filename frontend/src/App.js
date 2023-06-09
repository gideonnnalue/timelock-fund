import { useEffect, useState } from "react";
import { extendTheme, ChakraProvider, Container, Text, Box} from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import Main from "./components/Main";
import { connect } from "./utils/contract";
import "react-toastify/dist/ReactToastify.css";

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
  const [contract, setContract] = useState(null);
  const [connectedAddr, setConnectedAddr] = useState(null);
  const [balance, setBalance] = useState("");

  const connectWallet = async () => {
    try {
      const { balance, address, contract } = await connect();
      setContract(contract);
      setConnectedAddr(address);
      setBalance(balance);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    connectWallet();
    window.ethereum.on("accountsChanged", () => {
      connectWallet();
    });
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Container maxWidth="90%">
        <Header
          connectedAddress={connectedAddr}
          userBalance={balance}
          connectWallet={connectWallet}
        />
        <Box marginTop={1}>Works only on <Text as="b">Avalanchi Fuji C-Chain test net</Text></Box>
        {contract && <Main contract={contract} />}
        <ToastContainer />
      </Container>
    </ChakraProvider>
  );
}

export default App;
