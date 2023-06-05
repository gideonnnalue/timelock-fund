import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Button,
} from "@chakra-ui/react";

const LocksTable = () => {
  return (
    <Box height="80px">
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th textColor="grey">Id</Th>
              <Th textColor="grey">Amount</Th>
              <Th textColor="grey">Lock Period</Th>
              <Th textColor="grey">Status</Th>
              <Th textColor="grey">Time Remaining</Th>
              <Th textColor="grey">{}</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>001</Td>
              <Td>0.002ETH</Td>
              <Td>2 days 15 hours</Td>
              <Td>30 days</Td>
              <Td textColor="red">Locked</Td>
              <Td>
                <Button colorScheme="red" size="sm">
                  Withdraw
                </Button>
              </Td>
            </Tr>
            <Tr>
              <Td>002</Td>
              <Td>0.01ETH</Td>
              <Td>6 days 10 hours</Td>
              <Td>30 days</Td>
              <Td textColor="red">Locked</Td>
              <Td>
                <Button colorScheme="red" size="sm">
                  Withdraw
                </Button>
              </Td>
            </Tr>
            <Tr>
              <Td>001</Td>
              <Td>0.00022ETH</Td>
              <Td>2 days 15 hours</Td>
              <Td>12 days</Td>
              <Td textColor="red">Locked</Td>
              <Td>
                <Button colorScheme="red" size="sm">
                  Withdraw
                </Button>
              </Td>
            </Tr>
            <Tr>
              <Td>001</Td>
              <Td>0.009ETH</Td>
              <Td>0 days</Td>
              <Td>30 days</Td>
              <Td>Unlocked</Td>
              <Td>
                <Button colorScheme="teal" size="sm">
                  Withdraw
                </Button>
              </Td>
            </Tr>
            <Tr>
              <Td>001</Td>
              <Td>0.002ETH</Td>
              <Td>0 days</Td>
              <Td>30 days</Td>
              <Td>Unlocked</Td>
              <Td>
                <Button colorScheme="teal" size="sm">
                  Withdraw
                </Button>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default LocksTable;
