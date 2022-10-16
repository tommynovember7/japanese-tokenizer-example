const {asyncTokenizer} = require('./src/kuromoji/asyncTokenizer');

const text = 'A snowman is a sculpture made of snow. 雪だるまは雪でできた彫刻です。';

(async () => {
  const kuromojiTokenizer = await asyncTokenizer();
  const tokens = kuromojiTokenizer.tokenize(text).map((token) => token.surface_form);

  console.log(tokens); // It shows an array of words
})(text);

