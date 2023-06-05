import { useEffect, useState } from "react";
import { HStack, SimpleGrid } from "@chakra-ui/react";
import DepositModal from "./DepositModal";
import LocksTable from "./LocksTable";
import { getUsersLockedFunds } from "../utils/contract";

const Main = ({ contract }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getUserFunds = async () => {
      const data = await getUsersLockedFunds(contract);
      setData(data);
    };
    if (contract) getUserFunds();
  }, [contract]);
  return (
    <SimpleGrid row={2} spacing={10} marginTop={10}>
      <HStack>
        <DepositModal contract={contract} />
      </HStack>
      <LocksTable data={data} />
    </SimpleGrid>
  );
};
export default Main;
