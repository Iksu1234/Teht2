let dictionary = [];
const express = require("express");
const fs = require("fs");

var app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

/*CORS isn't enabled on the server, this is due to security reasons by default,
so no one else but the webserver itself can make requests to the server.*/

// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  res.setHeader("Content-type", "application/json");

  // Pass to next layer of middleware
  next();
});

// Read dictionary.txt file and return it as json
const readDictionaryFile = function () {
  const data = fs.readFileSync("dictionary.txt", {
    encoding: "utf8",
    flag: "r",
  });

  // luetaan tiedosto dictionary.txt ja tallennetaan splitLines muuttujaan
  const splitLines = data.split(/\r?\n/);
  dictionary.length = 0; // tyhjennetään dictionary taulukko
  splitLines.forEach((line) => {
    const words = line.split(" "); //sanat taulukkoon words, sanat eroteltu välilyönnillä
    const word = {
      fin: words[0],
      eng: words[1],
    };
    dictionary.push(word);
  });
  return dictionary;
};

// Overwrite a dictionary.txt file
const writeDictionaryFile = function (paramDictionary) {
  let newDictionary = [];
  paramDictionary.forEach((word) => {
    let result = word.fin + " " + word.eng;
    newDictionary.push(result);
  });
  fs.writeFileSync("dictionary.txt", newDictionary.join("\n"));
};

// GET all words from the dictionary
app.get("/words", (req, res) => {
  dictionary = readDictionaryFile();
  res.status(200).json(dictionary);
});

// GET a word from the dictionary
app.get("/words/:finWord", (req, res) => {
  const finWord = String(req.params.finWord);
  dictionary = readDictionaryFile();

  //search word from dictionary and return it in english if found
  const word = dictionary.find((word) => word.fin === finWord);
  if (word) {
    res.status(200).json(word.eng);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

// ADD a word to the dictionary
app.post("/words", (req, res) => {
  const word = req.body;
  dictionary = readDictionaryFile();

  if (word) {
    dictionary.push(word);
    writeDictionaryFile(dictionary);
    res.status(201).json(dictionary);
  } else {
    res.status(404);
  }
});

// UPDATE a word in the dictionary
app.put("/words", (req, res) => {
  const paramWord = req.body;
  let dictionary = readDictionaryFile();

  // Find the word in the dictionary
  let word = dictionary.find((word) => word.fin === paramWord.fin);

  if (word) {
    // Remove the old word and add the updated word
    dictionary = dictionary.filter((word) => word.fin !== paramWord.fin);
    dictionary.push(paramWord);
    writeDictionaryFile(dictionary);
    res.status(200).json(paramWord);
  } else {
    res.status(404).json({ message: "Word not found" });
  }
});

// DELETE a word from the dictionary
app.delete("/words/:finWord", (req, res) => {
  const finWord = String(req.params.finWord);
  let dictionary = readDictionaryFile();
  // Find the word in the dictionary
  let word = dictionary.find((word) => word.fin === finWord);

  if (word) {
    // Remove the old word and add the updated word
    dictionary = dictionary.filter((word) => word.fin !== finWord);
    writeDictionaryFile(dictionary);
    res.status(410).json({ message: "Word deleted" });
  } else {
    res.status(404).json({ message: "Word not found" });
  }
});

app.listen(3000, () => {
  console.log("Server listening at port 3000");
});
