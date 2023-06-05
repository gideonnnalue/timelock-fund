import { HStack, SimpleGrid } from "@chakra-ui/react";
import DepositModal from "./DepositModal";
import LocksTable from "./LocksTable";

const Main = ({ contract }) => {
  return (
    <SimpleGrid row={2} spacing={10} marginTop={10}>
      <HStack>
        <DepositModal contract={contract} />
      </HStack>
      <LocksTable contract={contract} />
    </SimpleGrid>
  );
};
export default Main;
