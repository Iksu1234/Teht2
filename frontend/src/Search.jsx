import PropTypes from "prop-types";
import { useState, useRef } from "react";
import { getWord } from "../services/dictionary";
import "./Search.css";

function Search({ onReturn }) {
  const [results, setResults] = useState(null);
  const inputRef = useRef(null);
  /*
  const getResults = () => {
    getDictionary().then((words) => {
      setResults(
        <ul>
          {words.map((item, index) => (
            <li key={index}>
              {item.fin} - {item.eng}
            </li>
          ))}
        </ul>
      );
    });
  };
*/
  const searchClick = () => {
    const inputValue = inputRef.current.value.trim();
    if (!inputValue) {
      return null;
    } else {
      return getResult(inputValue);
    }
  };
  const getResult = (input) => {
    getWord(input).then((word) => {
      if (!word) {
        setResults(<ul>Word not found</ul>);
        return;
      } else {
        setResults(
          <ul>
            <li>
              {input} - {word}
            </li>
          </ul>
        );
      }
    });
  };

  return (
    <>
      <h2>Search</h2>
      <div>
        <form>
          <label htmlFor="fsearch">Input finnish word:</label>
          <br />
          <input type="text" id="fsearch" name="fsearch" ref={inputRef} />
          <br />
          <button type="button" onClick={searchClick}>
            Search
          </button>
        </form>
      </div>
      <div>{results}</div>
      <button type="button" onClick={onReturn}>
        Return to main
      </button>
    </>
  );
}
Search.propTypes = {
  onReturn: PropTypes.func.isRequired,
};

export default Search;
