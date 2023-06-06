import { useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";

const ConfirmModal = ({ isOpen, onOpen, onClose, data, loading, onSubmit }) => {
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const modalBody = () => {
    if (!data.isLocked) {
      return (
        <ModalBody>
          You are about to withdrawal{" "}
          <Text color="teal" as="b">
            {data.amount}ETH
          </Text>{" "}
          of unLocked funds.
          <Text>Do you wish to continue?</Text>
        </ModalBody>
      );
    } else {
      return (
        <ModalBody>
          You are about to withdrawal funds before lock period has expired. If
          you wish to continue, you would pay a fine of 10% and recieve (
          <Text color="red" as="b">
            {data.amount*0.9}ETH
          </Text>
          ) of locked fund.
          <Text>Do you wish to continue?</Text>
        </ModalBody>
      );
    }
  };

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textColor="teal">Withdraw Funds</ModalHeader>
        <ModalCloseButton />
        {modalBody()}
        <ModalFooter>
          <Flex>
            <Box>
              <Button
                colorScheme="teal"
                mr={3}
                loadingText="Submitting"
                variant="ghost"
                isLoading={loading}
                onClick={onSubmit}
              >
                Continue
              </Button>
            </Box>
            <Box>
              <Button colorScheme="red" onClick={onClose} variant="outline">
                Cancel
              </Button>
            </Box>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmModal;
