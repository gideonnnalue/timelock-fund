import { forwardRef } from "react";
import { Input } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateInput = ({ date, setDate, name }) => {
  const ChakraInput = forwardRef(({ value, onClick }, ref) => (
    <Input
      placeholder=""
      onClick={onClick}
      ref={ref}
      value={value}
      name={name}
      readOnly
    />
  ));
  return (
    <DatePicker
      selected={date}
      onChange={(date) => setDate(date)}
      customInput={<ChakraInput />}
    />
  );
};

export default DateInput;
