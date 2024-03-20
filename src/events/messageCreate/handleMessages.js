const userInteractions = require("../../user-interactions");

userInteractions

module.exports = async (client, msg) => {
  console.log(
    `[${msg.guild.nameAcronym}] ${msg.author.globalName}: "${msg.content}"`
  );
  if (userInteractions.checkUserInteraction(msg, client)) {
    return;
  }
};
