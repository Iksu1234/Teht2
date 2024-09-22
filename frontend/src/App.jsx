import { useState } from "react";
import "./App.css";
import Search from "./Search";
import Add from "./Add";

function App() {
  const [page, setPage] = useState("home");

  const handleButtonClick = (newPage) => {
    setPage(newPage);
  };

  return (
    <>
      {page === "home" ? (
        <>
          <h2>Dictionary app</h2>
          <button type="button" onClick={() => handleButtonClick("search")}>
            Search
          </button>
          <button type="button" onClick={() => handleButtonClick("add")}>
            Add
          </button>
        </>
      ) : page === "search" ? (
        <Search onReturn={() => handleButtonClick("home")} />
      ) : page === "add" ? (
        <Add onReturn={() => handleButtonClick("home")} />
      ) : null}
    </>
  );
}

export default App;
