/**
 * @param tag
 * @param segment
 * @returns {`<a href="${*}">${*}</a>`}
 */
const createLink = (tag, segment) => `<a href="${tag[1]}">${segment}</a>`;


/**
 * Tag Definition Example:
 * Each tag information is defined as a tuple of two elements.
 * Tsugu-service provides them as a list of tuples.
 *
 * tagNames = [
 *   ['ココ・シャネル', '/tag/coco-chanel'],
 *   ['シャネルスーツ', '/tag/chanel-suits'],
 *   ['シャネル', '/tag/chanel']
 * ];
 *
 * @param tokens
 * @param tags
 * @returns void
 */
const markupTagNames = (tokens, tags = []) => {     // tags = tagNames
  for (let i = 0; i < tokens.length; i += 1) {
    if (tags.length === 0) {
      break;
    }

    const token = tokens[i];
    tags.forEach((tag, tagIndex) => {
      if (token.toLowerCase() === tag[0].toLowerCase()) {
        tokens[i] = createLink(tag, token);
        delete (tags[tagIndex]);
      }
    });
  }
};


module.exports = {
  markupTagNames
};
