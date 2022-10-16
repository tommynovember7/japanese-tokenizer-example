const kuromoji = require('kuromoji');

const CUSTOMISED_DICTIONARY_DIR = `${__dirname}/../../dict`;

/**
 * @returns {Promise<Tokenizer>}
 */
const asyncTokenizer = (dicPath = '') => new Promise((resolve, reject) => {
  dicPath = dicPath || CUSTOMISED_DICTIONARY_DIR;
  kuromoji
    .builder({dicPath})
    .build((err, tokenizer) => {
      if (err) {
        reject(err);
      }
      resolve(tokenizer);
    });
});

module.exports = {
  asyncTokenizer
};
