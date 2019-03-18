const translate = require('translate-google')
const wanakana = require('wanakana')

const englishContractions = require('./data/englishContractions');
const japaneseWordList = require('./data/jMdictWords')
const TinySegmenter = require('./tokenizers/tinySegmenter')

const wordExistingEnglish = require('./utils/wordExistingEnglish')

const translationTool = async (inputText) => {

	//Segment japanese string into words
	const segmenter = new TinySegmenter();
	const segments = segmenter.segment(inputText)

	//Now loop through segments and detect those that are NOT in the japaneseWordList from JMdict_e
	let unknownWords = [];
	segments.forEach(segment => {
	if (-1 == japaneseWordList.indexOf(segment)) {
		unknownWords.push(segment)
	}
	})
	unknownWords = [...new Set(unknownWords)]


	//Now, for unkwownWords, if any, try to convert them to HIRAGANA and search again in the wordList.
	//If they happen to exist there, we will replace them in the input to make them translatable.

	let hiraganaUnknownWords = [];
	unknownWords.forEach(word => {
	const res = wanakana.toHiragana(word)
	hiraganaUnknownWords.push(res)
	})

	let hiraganaReplacements = [];
	hiraganaUnknownWords.forEach((word, i) => {
	if (-1 != japaneseWordList.indexOf(word)) {
		hiraganaReplacements.push({input: unknownWords[i], output: word})
	}
	})

	//Apply hiragana translations
	hiraganaReplacements.forEach(pair => {
		const {output, input} = pair;   
		inputText = inputText.replace(new RegExp(input, 'g'), output);
	})

	//Do the translation
	const tranObj = {text: inputText}
	const res = await translate(tranObj, {to: 'en'})
	
	let translation = res.text;
	const result = {
		translation: translation,
		requires_human_check: false,
		non_english_wordlist: []
	};

	//Check if words translated belong to english. If not, keep the words, and return an object with them.
	let checkTranslation = translation.toLowerCase();
	checkTranslation = checkTranslation.replace(new RegExp("\n", "g"), " ")
	checkTranslation = checkTranslation.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\?¿"]/g,"");
	checkTranslation = checkTranslation.replace(/\s{2,}/g," ");

	//Undo contractions to detect them as english words
	Object.keys(englishContractions).forEach(contraction => {		
		checkTranslation = checkTranslation.replace(
			new RegExp(contraction, "g"), 
			englishContractions[contraction]
		)
	})

	let translatedWords = checkTranslation.split(" ");
	translatedWords = translatedWords.map(w => w.toLowerCase());
	translatedWords = [...new Set(translatedWords)];

	translatedWords.forEach(word => {
		if (!wordExistingEnglish(word) && word != "\n") {
				result.requires_human_check = true;
				if (word) {
					result.non_english_wordlist.push(word);
				}
		}
	});

	return result;

}

module.exports = translationTool;