// This file contains the functions that are used to fetch data from the backend.

// Gets the whole dictionary.
export function getDictionary() {
  return fetch("http://localhost:3000/words").then((data) => data.json());
}

// Gets a word translation with the finnish word.
export function getWord(input) {
  return fetch(`http://localhost:3000/words/${input}`).then((data) => {
    if (data.status == 200) {
      return data.json();
    } else {
      return null;
    }
  });
}

// Adds a new word translation to the dictionary.
export function addWord(inputFin, inputEng) {
  return fetch("http://localhost:3000/words", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fin: inputFin, eng: inputEng }),
  }).then((data) => {
    return data.status;
  });
}
