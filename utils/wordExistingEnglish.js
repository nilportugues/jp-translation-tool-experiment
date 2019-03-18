const extraWords = require('../data/englishWords')
const wordlist = require('wordlist-english')
const englishWords = wordlist['english'];

const exists = (word) => {
	return (-1 != englishWords.indexOf(word) || -1 != extraWords.indexOf(word) );
}

module.exports = exists;
