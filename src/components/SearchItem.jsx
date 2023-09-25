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
        mb={"3rem"}
        onChange={handleChange}
      />
    </div>
  );
};
