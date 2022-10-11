// Tag Definition Example:
// Each tag information is defined as a tuple of two elements.
// Tsugu-service provides them as a list of tuples.
//
// tagNames = [
//   ['ココ・シャネル', '/tag/coco-chanel'],
//   ['シャネルスーツ', '/tag/chanel-suits'],
//   ['シャネル', '/tag/chanel']
// ];


/**
 * @param tag
 * @returns {`<a href="${*}">${*}</a>`}
 */
const markup = (tag) => `<a href="${tag[1]}">${tag[0]}</a>`;


/**
 * @param segments
 * @param tags
 * @returns void
 */
const generateLinks = (segments, tags = []) => {
  for (let i = 0; i < segments.length; i += 1) {
    if (tags.length === 0) {
      break;
    }

    const currentSegment = segments[i];
    tags.filter((tag) => tag).map((tag, tagIndex) => {
      if (currentSegment === tag[0]) {
        segments[i] = markup(tag);
        delete (tags[tagIndex]);
      }

      return tag;
    });
  }
};

module.exports = {
  generateLinks
};
