import PropTypes from "prop-types";
import { addWord } from "../services/dictionary";
import { useRef, useState } from "react";

function Add({ onReturn }) {
  const [results, setResults] = useState(null);
  const inputRefFin = useRef(null);
  const inputRefEng = useRef(null);

  useRef(null);

  const addClick = () => {
    const inputFin = inputRefFin.current.value.trim();
    inputFin.toLowerCase();
    const inputEng = inputRefEng.current.value.trim();
    inputEng.toLowerCase();

    if (!inputFin || !inputEng) {
      return null;
    } else {
      addWord(inputFin, inputEng).then((data) => {
        if (data === 201) {
          setResults(<ul>Word added</ul>);
        } else {
          setResults(<ul>Error</ul>);
        }
      });
    }
  };
  return (
    <>
      <h2>Add word</h2>
      <div>
        <form>
          <label htmlFor="fsearch">Finnish:</label>
          <br />
          <input type="text" id="fadd" name="fadd" ref={inputRefFin} />
          <br />
          <label htmlFor="fsearch">English:</label>
          <br />
          <input type="text" id="fadd" name="fadd" ref={inputRefEng} />
          <br />
          <button type="button" onClick={addClick}>
            Add
          </button>
        </form>
        <div>{results}</div>
      </div>
      <button type="button" onClick={onReturn}>
        Return to main
      </button>
    </>
  );
}
Add.propTypes = {
  onReturn: PropTypes.func.isRequired,
};

export default Add;
