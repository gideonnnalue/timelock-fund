import { HStack, SimpleGrid } from "@chakra-ui/react";
import DepositModal from "./DepositModal";
import LocksTable from "./LocksTable";

const Main = () => {
  return (
    <SimpleGrid row={2} spacing={10} marginTop={10}>
      <HStack>
        <DepositModal />
      </HStack>
      <LocksTable />
    </SimpleGrid>
  );
};
export default Main;
