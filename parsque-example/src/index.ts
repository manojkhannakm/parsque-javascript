import FileParser from "./file_parser";

new FileParser()
    .create()
    .then(parser => parser.parseWord())
    .then(parser => parser.parseWords(0, 2))
    .then(parser => parser.parseFile(childParser => childParser.parseWord()
        .then(childParser => childParser.parseWords(0, 1, 2))))
    .then(parser => parser.parseFiles(childParser => childParser.parseWord()
        .then(childParser => childParser.parseWords(0, 1, 2)), 0, 2))
    .then(parser => {
        console.log(JSON.stringify(parser.output, null, 2));
    })
    .catch(error => {
        console.error(error);
    });
