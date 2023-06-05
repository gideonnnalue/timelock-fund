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
  useDisclosure,
  Box,
  Flex,
  Text,
  Center,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Formik } from "formik";
import * as Yup from 'yup';
import "react-datepicker/dist/react-datepicker.css";

import DateInput from "./DateInput";


const DepositSchema = Yup.object().shape({
  amount: Yup.number().min(0.001).required('Required'),
  date: Yup.date().min(new Date()).required('Required')
})

const DepositModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const onSubmit = () => {
    
  };


  return (
    <>
      <Button onClick={onOpen}>
        <AddIcon boxSize={3} />
        <Text marginLeft={2}>Lock ETH</Text>
      </Button>

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
          <Formik
            initialValues={{ amount: "", date: new Date() }}
            validationSchema={DepositSchema}
            onSubmit={onSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              setFieldValue
            }) => (
              <>
                <ModalBody pb={6}>
                  <FormControl isInvalid={!!errors.amount}>
                    <FormLabel>Amount (in ETH)</FormLabel>
                    <Input
                      ref={initialRef}
                      placeholder=""
                      name="amount"
                      type="number"
                      value={values.amount}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <FormErrorMessage>{errors.amount}</FormErrorMessage>
                  </FormControl>

                  <FormControl mt={4} isInvalid={!!errors.date}>
                    <FormLabel>Unlock Date</FormLabel>
                    <DateInput
                      date={values.date}
                      onBlur={handleBlur}
                      name="date"
                      setDate={(date) => setFieldValue("date", date, true)}
                      placeholder=""
                    />
                    <FormErrorMessage>{errors.date}</FormErrorMessage>
                  </FormControl>
                </ModalBody>
                <ModalFooter>
                  <Flex>
                    <Box>
                      <Button colorScheme="teal" mr={3} onClick={handleSubmit}>
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
              </>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DepositModal;
