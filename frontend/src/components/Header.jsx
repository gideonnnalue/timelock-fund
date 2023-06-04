import { Flex, Heading, Image, Box, HStack, Button, Spacer } from "@chakra-ui/react";
import logo from "../assets/logo.svg";

const Header = () => {
  return (
    <Flex marginTop={5}>
      <Box>
        <HStack h="40px">
          <Image src={logo} boxSize="40px" objectFit="cover" />
          <Heading as="h4" size="lg" fontFamily="Playfair Display" color="brand">
            Time Lock
          </Heading>
        </HStack>
      </Box>
      <Spacer />
      <Box>
        <HStack h="40px">
          <Button colorScheme="teal" size="lg">Connect Wallet</Button>
        </HStack>
      </Box>
    </Flex>
  );
};

export default Header;
