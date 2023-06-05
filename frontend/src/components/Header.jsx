import {
  Flex,
  Heading,
  Image,
  Box,
  HStack,
  Button,
  Spacer,
  Icon,
  Text,
} from "@chakra-ui/react";
import truncateEthAddress from "truncate-eth-address";
import { BiWallet } from "react-icons/bi";
import logo from "../assets/logo.svg";

const Header = ({ connectedAddress, userBalance, connectWallet }) => {
  return (
    <Flex marginTop={5}>
      <Box>
        <HStack h="40px">
          <Image src={logo} boxSize="40px" objectFit="cover" />
          <Heading
            as="h4"
            size="lg"
            fontFamily="Playfair Display"
            color="brand"
          >
            Time Lock
          </Heading>
        </HStack>
      </Box>
      <Spacer />
      <Box>
        <HStack h="40px">
          {userBalance && <HStack>
            <Icon boxSize={8} as={BiWallet} />
            <Text>{userBalance}ETH</Text>
          </HStack>}
          {connectedAddress ? (
            <Button fontSize="lg">
              {truncateEthAddress(connectedAddress)}
            </Button>
          ) : (
            <Button colorScheme="teal" size="lg" onClick={connectWallet}>
              Connect Wallet
            </Button>
          )}
        </HStack>
      </Box>
    </Flex>
  );
};

export default Header;
