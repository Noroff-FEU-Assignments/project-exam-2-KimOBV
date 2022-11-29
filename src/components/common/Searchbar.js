/* import { useState, useMemo } from "react";

export default function Searchbar({searchValue, }) {
  const [items] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const filteredItems = useMemo(() => {
    items.filter((item) => {
      return item.toLowerCase().includes(searchValue.toLowerCase());
    });
  }, [items, searchValue]);

  function filterInput(e) {
    setSearchValue(e.target.value);
  }

  return (
    <>
      <input value={searchValue} type="search" onChange={filterInput} />
    </>
  );
} */
