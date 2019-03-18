const translate = require('translate-google')
const wanakana = require('wanakana')

const wordList = require('./JMdictWords.array')
const TinySegmenter = require('./tiny_segmenter-0.2')

/*
function replaceBulk( str, findArray, replaceArray ){
  var i, regex = [], map = {}; 
  for( i=0; i<findArray.length; i++ ){ 
    regex.push( findArray[i].replace(/([-[\]{}()*+?.\\^$|#,])/g,'\\$1') );
    map[findArray[i]] = replaceArray[i]; 
  }
  regex = regex.join('|');
  str = str.replace( new RegExp( regex, 'g' ), function(matched){
    return map[matched];
  });
  return str;
}

const katakanaToLatin = {
"ション": "SHON",
"ディ": "DI",
"ファ": "FA",
"ウィ": "WI",
"チェ":"CHE", 	
"チュ":"CHU", 	
"チュ":"CHU", 	
"チョ":"CHO", 
"ニャ":"NYA", 	
"ニュ":"NYU", 	
"ニョ":"NYO", 
"ヒャ":"HYA", 	
"ヒュ":"HYU", 	
"ヒョ":"HYO", 
"ミャ":"MYA", 	
"ミュ":"MYU", 	
"ミョ":"MYO", 
"リャ":"RYA", 	
"リュ":"RYU", 	
"リョ":"RYO",
"ギャ":"GYA", 	
"ギュ":"GYU", 	
"ギョ":"GYO", 
"ビャ":"BYA", 	
"ビュ":"BYU", 	
"ビョ":"BYO", 
"ピャ":"PYA", 	
"ピュ":"PYU", 	
"ピョ":"PYO", 
"キャ":"KYA", 	
"キュ":"KYU", 	
"キョ":"KYO", 	
"シャ":"SHA", 	
"シュ":"SHU", 	
"ショ":"SHO", 
"ジュ":"JU",
"ジョ":"JO",
"ジャ":"JA",
"ヂャ":"JA",
"ヂュ":"JU",
"ヂョ":"JO",
"サ":"SA", 	
"シ":"SHI", 
"チ":"CHI", 	
"ツ":"TSU", 	
"ス":"SU", 	
"セ":"SE", 	
"ソ":"SO", 	
"タ":"TA", 	
"テ":"TE", 	
"ト":"TO", 	
"ナ":"NA", 	
"ニ":"NI", 	
"ヌ":"NU", 	
"ネ":"NE", 	
"ノ":"NO", 	
"ハ":"HA", 	
"ヒ":"HI", 	
"フ":"FU", 	
"ヘ":"HE", 	
"ホ":"HO", 	
"マ":"MA", 	
"ミ":"MI", 	
"ム":"MU", 	
"メ":"ME", 	
"モ":"MO", 	
"ヤ":"YA", 	
"ユ":"YU", 	
"ヨ":"YO", 	
"ラ":"RA", 	
"リ":"RI", 	
"ル":"RU", 	
"レ":"RE", 	
"ロ":"RO", 	
"ワ":"WA", 	
"ヰ":"WI",  	
"ヱ":"WE", 	
"ヲ":"WO", 
"ガ":"GA", 	
"ギ":"GI", 	
"グ":"GU", 	
"ゲ":"GE", 	
"ゴ":"GO", 	
"ザ":"ZA", 	
"ジ":"JI",
"ズ":"ZU",
"ゼ":"ZE", 	
"ゾ":"ZO", 	
"ダ":"DA", 	
"ヂ":"JI",
"ヅ":"ZU",
"デ":"DE", 	
"ド":"DO", 	
"バ":"BA", 	
"ビ":"BI", 	
"ブ":"BU", 	
"ベ":"BE", 	
"ボ":"BO", 	
"パ":"PA", 	
"ピ":"PI", 	
"プ":"PU", 	
"ペ":"PE", 	
"ポ":"PO", 	
"ア":"A", 	
"イ":"I", 	
"ウ":"U", 	
"エ":"E", 	
"オ":"O",
"カ":"KA", 	
"キ":"KI", 	
"ク":"KU", 	
"ケ":"KE", 	
"コ":"KO", 
"ン": "N",
"ー": "",
}
*/

let inputText = `
繰り返してたびたび辛い思いする夜は
セツナバックビートかったるいと嘆いた夜は
繰り返してまた聴き直してまた繰り返せる世界で
僕はせっせとせっせとせっせとせっせとせっせとMUSIC

リピートして リピートステップして
リピートして また踏みだして
何度だって イヤフォンの中に潜む悪魔が
袖をひっぱって「まだ遊び足りない」って
リピートして リピートステップして
リピートして また駆け出して
何度だって スピーカーから漏れる愛の歌が
止まらないんだってコンセント刺さってないのに

繰り返してまたきた痛い思いする日々が
止まらないスコールばっくれるな逃げ腰ランナー
君の心のリュック重量オーバーでぱんぱんぱん ぱんぱんぱぱん
リセットして

リピートして リピートステップして
リピートして また踏みだして
何度だって イヤフォンの中に潜む悪魔が
袖をひっぱって「まだ遊び足りない」って
リピートして リピートステップして
リピートして また駆け出して
何度だって スピーカーから漏れる愛の歌が
止まらないんだってコンセント刺さってないのに

行ってきては 戻ってきては
リピートして 今までの関係も
全部リセットするわけないわ 全部背負ったまま

リピートして リピートステップして
リピートして また踏みだして
何度だって イヤフォンの中に潜む悪魔が
袖をひっぱって「まだ遊び足りない」って
リピートして リピートステップして
リピートして また駆け出して
何度だって スピーカーから漏れる愛の歌が
止まらないんだってコンセント刺さってないのに

音楽は止まない ずっと しょっちゅう しょっちゅう
`

inputText = `
クラクションに佇む灯り
命を差し出して
今にも崩れそうになる
時にディストラクション

甘い甘いキスを呼ぶように
暗い深い闇に溺れてくんだ

クラクションの音を食した
渋谷街頭の夜に
色づく髪つかみ飛ばす
潔く死にたい人
渦巻く性の欲望
途端にこだまさせて

ワガママで誤摩化さないで
ワガママは勝手でしょ？
誰かを守りたいと独り嘆く
ワガママで誤摩化さないで
ワガママに嫉妬して
沈んでは浮かぶ子供の匂いがした

甘い甘いキスで確かめて
暗い深い愛に溺れてく

また飛ぶ考えられない霧中浮遊
解放する
今にも崩れそうな面影
誰のために今を生きて
誰のために愛を確かめる？
時に視界映る美には
リスクの逆さ言葉が似合う

ワガママで誤摩化さないで
ワガママは勝手でしょ？
思いもよらない言葉降り注ぐ
ワガママの意味を知らない
ワガママが合図でしょ？
沈んでは浮かぶ子供の血を好んだ

クラクションの音は止まらない
交差点突き抜けて
光に合わせ踊った幻覚と現実を
重ね狂う

失ってやっと気づいた
本当のその意味に
独りきりの夜が朝を迎える
誰かに愛され　そして
誰かを愛す時
今までの過去にさよなら告げて
ワガママにそっと愛を付け足して

甘い甘いキスを呼ぶように

足下コンクリートの香り
ほら　また始まる
あの日の見苦しい僕の姿は
もう此処にはないから
`




//Segment japanese string into words
const segmenter = new TinySegmenter();
const segments = segmenter.segment(inputText)

//Now loop through segments and detect those that are NOT in the wordList from JMdict_e
let unknownWords = [];
segments.forEach(segment => {
   if (-1 == wordList.indexOf(segment)) {
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
   if (-1 != wordList.indexOf(word)) {
      hiraganaReplacements.push({input: unknownWords[i], output: word})
   }
})

console.log(hiraganaReplacements)

//Apply hiragana translations
hiraganaReplacements.forEach(pair => {
   const k = pair.input;
   const v = pair.output
  inputText =  inputText.replace(new RegExp(k, 'g'), v);
})





//Do the translation
const char = "/"
const symbol = ` ${char}`
const symbolGoogle = `${char}`

inputText = inputText.split("\n\n").join(symbol+symbol);
//inputText = inputText.split("\n").join(symbol);

text = inputText;
const tranObj = {text: text}


const res = translate(tranObj, {to: 'en'}).then(res => {
	let translation = res.text;
  translation = translation.split(symbol+symbol).join("\n\n")
	translation = translation.split(symbolGoogle).join("\n")
	console.log(translation);
})


