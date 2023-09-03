import { Input, Center } from "@chakra-ui/react";

export const TextInput = ({ changeFn, ...props }) => {
  return (
    <Center>
      <Input
        ml={3}
        variant="outline"
        focusBorderColor="pink.500"
        w={"23rem"}
        mt={"1rem"}
        onChange={changeFn}
        {...props}
      />
    </Center>
  );
};
