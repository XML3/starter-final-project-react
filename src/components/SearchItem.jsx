import { TextInput } from "./UI/TextInput";

export const SearchItem = ({ handleFilteredEvents }) => {
  const handleChange = (e) => {
    const searchValue = e.target.value;
    //calls function from the Root component, passes search user input as argument.
    handleFilteredEvents(searchValue);
  };

  return (
    <div className="search item">
      <TextInput
        placeholder="Name or Location"
        fontSize={{ base: "0.7rem", md: "0.7rem" }}
        mb={"3rem"}
        w={{ base: "9rem", md: "20rem" }}
        onChange={handleChange}
      />
    </div>
  );
};
