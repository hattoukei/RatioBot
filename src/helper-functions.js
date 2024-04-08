module.exports = {
  checkValidUser: function (uuid, json) {
    let found = false;

    for (let i = 0; i < json.length; i++) {
      if (json[i].uuid === uuid) {
        found = true;
        break;
      }
    }
    return found;
  },
  checkValidSubstring: function (content, json) {
    let found = false;

    for (let i = 0; i < json.length; i++) {
      if (content.includes(json[i].substring)) {
        found = true;
        break;
      }
    }
    return found;
  },
};
