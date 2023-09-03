import { useState } from "react";
import { TextInput } from "./UI/TextInput";
// import { TextInput } from "../components/UI/TextInput";

export const SearchItem = ({ handleFilteredEvents }) => {
  const handleChange = (e) => {
    const searchValue = e.target.value;
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
