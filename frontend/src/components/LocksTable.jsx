import { useEffect } from "react";
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
  Text,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const tableHead = [
  "Id",
  "Amount",
  "Lock Period",
  "Time Remaining",
  "Status",
  "",
];

const LocksTable = ({ data, onWithdraw }) => {
  const isLocked = (column) => {
    return column.expirationTime - column.creationDate > 0;
  };
  const toEther = (value) => {
    return ethers.utils.formatEther(value);
  };
  const getLockPeriod = (from, to) => {
    const startDate = new Date(Number(from));
    const endDate = new Date(Number(to));
    return dayjs(endDate).from(startDate, true);
  };
  const getRemainingTime = (endDate) => {
    const date = new Date(Number(endDate));
    return dayjs(date).fromNow(true);
  };
  const getStatusText = (column) => {
    if (isLocked(column)) {
      return <Text color="red">Locked</Text>;
    } else {
      return <Text color="green">Unlocked</Text>;
    }
  };

  const onSubmitWithdrawal = (column) => {
    onWithdraw(column.id.toString(), toEther(column.amount), isLocked(column));
  };
  const getColumnData = (column) => {
    return (
      <Tr key={column.id.toString()}>
        <Td>{column.id.toString().padStart(3,"0")}</Td>
        <Td>{toEther(column.amount)}ETH</Td>
        <Td>
          {getLockPeriod(
            column.creationDate.toString(),
            column.expirationTime.toString()
          )}
        </Td>
        <Td>{getRemainingTime(column.expirationTime.toString())}</Td>
        <Td>{getStatusText(column)}</Td>
        <Td>
          <Button
            colorScheme={isLocked(column) ? "red" : "teal"}
            size="sm"
            onClick={() => onSubmitWithdrawal(column)}
          >
            Withdraw
          </Button>
        </Td>
      </Tr>
    );
  };

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
            {data.map((item) => {
              return getColumnData(item);
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default LocksTable;
