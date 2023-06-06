import { useEffect, useState } from "react";
import { SimpleGrid, useDisclosure } from "@chakra-ui/react";
import { toast } from "react-toastify";
import DepositModal from "./DepositModal";
import LocksTable from "./LocksTable";
import { getUsersLockedFunds } from "../utils/contract";
import ConfirmModal from "./ConfirmationModal";
import { withdrawFunds } from "../utils/contract";

const Main = ({ contract }) => {
  const [data, setData] = useState([]);
  const [transactionDetail, setTransactionDetail] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onConfirm = (lockId, amount, isLocked) => {
    setTransactionDetail({ lockId, amount, isLocked });
    onOpen();
  };

  const submitRequest = async () => {
    try {
      setIsSubmitting(true);
      const tx = await withdrawFunds(contract, transactionDetail.lockId);
      toast.promise(tx.wait, {
        pending: "Waiting for confirmations",
        success: "Transaction complete 👌",
        error: "Transaction rejected 🤯",
      });
      toast.success("Withdrawal Successful", {
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
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const getUserFunds = async () => {
      const data = await getUsersLockedFunds(contract);
      setData(data);
    };
    if (contract) getUserFunds();
  }, [contract]);
  return (
    <SimpleGrid row={2} spacing={10} marginTop={10}>
      <ConfirmModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        onSubmit={submitRequest}
        data={transactionDetail}
        loading={isSubmitting}
      />
      <DepositModal contract={contract} />
      <LocksTable data={data} onWithdraw={onConfirm} />
    </SimpleGrid>
  );
};
export default Main;
