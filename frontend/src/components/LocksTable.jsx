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
import { ethers } from "ethers";
import { useEffect } from "react";

const tableHead = [
  "Id",
  "Amount",
  "Lock Period",
  "Time Remaining",
  "Status",
  "",
];

const LocksTable = ({ data }) => {
  useEffect(()=>{
    console.log(data[0].amount)
  },[data])
  return (
    <Box height="80px">
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              {tableHead.map((item) => (
                <Th key={item} textColor="grey">
                  {item}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {/* {data.map((item) => {
              return (
                <Tr>
                  <Td>{item.id}</Td>
                  <Td>0.0001ETH</Td>
                  <Td>2 days some months</Td>
                  <Td>30 days</Td>
                  <Td>Locked</Td>
                  <Td>
                    <Button colorScheme="teal" size="sm">
                      Withdraw
                    </Button>
                  </Td>
                </Tr>
              );
            })} */}
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
