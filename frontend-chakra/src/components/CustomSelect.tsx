import React from "react";
import { Select } from "@chakra-ui/react";

interface Props {
  sign: string;
}

export const CustomSelect: React.FC<Props> = (props: Props) => {
  const sign = props.sign;
  const selectOptions: string[] = ["!", "!!", "?", "??", "!?", "?!"];
  return (
    <div>
      <Select
        placeholder=""
        defaultValue={sign}
        borderColor="gray.400"
        borderWidth="0.5px"
      >
        {selectOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </div>
  );
};
