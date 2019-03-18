const wordlist = require('wordlist-english')
const englishWords = wordlist['english'];

const exists = (word) => {
	return (-1 == englishWords.indexOf(word));
}

module.exports = exists;
