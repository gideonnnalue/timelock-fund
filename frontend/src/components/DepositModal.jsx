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
  HStack,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";

import DateInput from "./DateInput";
import { lockFunds } from "../utils/contract";
import dayjs from "dayjs";

const DepositSchema = Yup.object().shape({
  amount: Yup.number().min(0.001).required("Required"),
  date: Yup.date().min(new Date(), "Select a later date").required("Required"),
});

const DepositModal = ({ contract }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setSubmitting(true);
      const { amount, date } = values;
      const timestamp = dayjs(date).valueOf();
      const startTime = Date.now();
      const tx = await lockFunds(contract, {
        amount,
        date: timestamp,
        start: startTime,
      });
      toast.promise(tx.wait, {
        pending: "Waiting for confirmations",
        success: "Transaction complete 👌",
        error: "Transaction rejected 🤯",
      });
      resetForm({ amount: "", date: new Date() });
      toast.success("Transaction Successful", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <HStack>
        <Button onClick={onOpen}>
          <AddIcon boxSize={3} />
          <Text marginLeft={2}>Lock ETH</Text>
        </Button>
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
              setFieldValue,
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
                      <Button
                        colorScheme="teal"
                        mr={3}
                        onClick={handleSubmit}
                        isLoading={isSubmitting}
                        loadingText="Submitting"
                      >
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
