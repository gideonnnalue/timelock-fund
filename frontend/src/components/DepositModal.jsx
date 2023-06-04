import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import React from "react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { HStack, Spacer, Flex, Text, Center } from "@chakra-ui/react";

const DepositModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      <HStack onClick={onOpen} marginLeft={5} height="80px">
        <AddIcon boxSize={5} />
        <p>Lock ETH</p>
      </HStack>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Deposit Funds</ModalHeader>
          <ModalCloseButton />

          <Center fontSize="xs" marginLeft={5}>
            Funds deposited would be locked for the selected period and any
            withdrawal request before the set time would result to a fine of a
            percentage of the locked fine based on time of request
          </Center>

          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Amount (in ETH)</FormLabel>
              <Input ref={initialRef} placeholder="" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Unlock Date</FormLabel>
              <Input placeholder="" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Reason</FormLabel>
              <Input placeholder="" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Flex>
              <Box>
                <Button colorScheme="teal" mr={3}>
                  Lock Funds
                </Button>
              </Box>
              <Box>
                <Button colorScheme="red" onClick={onClose}>
                  Cancel
                </Button>
              </Box>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DepositModal;
