import { useEffect, useState } from "react";
import { extendTheme, ChakraProvider, Container } from "@chakra-ui/react";
import Header from "./components/Header";
import Main from "./components/Main";
import { connect, provider } from "./utils/contract";

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
  const [contractData, setContractData] = useState(null);
  const [connectedAddr, setConnectedAddr] = useState(null);
  const [balance, setBalance] = useState("");

  const connectWallet = async () => {
    const { balance, address, contract } = await connect();
    setContractData(contract);
    setConnectedAddr(address);
    setBalance(balance);
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
        <Main />
      </Container>
    </ChakraProvider>
  );
}

export default App;
