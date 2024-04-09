const { ApplicationCommandOptionType } = require("discord.js");
const Player = require("../../schemas/player.js");

module.exports = {
  name: "cf",
  description: "Bet some money and flip a coin.",
  testOnly: true,
  options: [
    {
      name: "bet",
      description: "Select the amount you want to bet.",
      type: ApplicationCommandOptionType.Integer,
      required: true,
    },
  ],

  callback: async (client, interaction) => {
    let user = interaction.user;
    console.log(`'${user.username}' is gambling with a coinflip.`);

    const query = {
      userId: interaction.user.id,
      guildId: interaction.guild.id,
    };

    const playerBalance = await Player.findOne(query);

    try {
      if (playerBalance) {
        // Sets the player's bet value.
        let bet = interaction.options.get("bet").value;
        let coinsBefore = playerBalance.coins;
        let win = false;
        let roll;

        // Checks if bet amount exceeds the user's balance. If so, exits.
        if (bet > playerBalance.coins) {
          console.log(
            "Error: User attempted to bet more than their current balance."
          );
          interaction.reply({
            content: `Sorry, you cannot bet ${bet} coins. Your balance is: ${playerBalance.coins}`,
            ephemeral: true,
          });
          return;
        }

        // Checks if bet is negative.
        if (bet <= 0) {
          console.log(`User attempted to enter a negative amount of coins.`);
          interaction.reply({
            content: `Sorry, you cannot bet ${bet} coins. Please choose a positive integer.`,
            ephemeral: true,
          });
          return;
        }

        // Randomizes heads or tails if user did not select one.
        roll = Math.floor(Math.random() * 100);
        let response = "";
        let sideroll = roll % 2;
        console.log(roll);

        // Special RNG case (10x rewards)
        if (roll === 1) {
          interaction.reply(
            `The coin is standing on the rim. <@${user.id}> has won ${bet * 10} coins.`
          );

          playerBalance.coins += 10 * bet;

          await playerBalance.save().catch((e) => {
            console.log(`Error saving balance ${e}`);
          });

          return;
        }

        // Checks if user won the flip.
        if (sideroll === 0) {
          win = true;
        }

        // Calculates the user's balance.
        if (win) {
          playerBalance.coins += bet;
          response += `<@${user.id}> has won ${bet} coins.`;
        } else {
          playerBalance.coins -= bet;
          response += `<@${user.id}> has lost ${bet} coins.`;
        }

        interaction.reply(response);

        // Saves the changes from above to the database
        await playerBalance.save();

        let coinsAfter = playerBalance.coins;

        console.log(
          `${playerBalance.userName}'s balance went from ${coinsBefore} -> ${coinsAfter}.`
        );
      } else {
        interaction.reply(
          "You must first register your uuid using `/dbreg` before using this command."
        );
        return;
      }
    } catch (error) {
      console.log(`Error has occurred: ${error}`);
    }
  },
};
