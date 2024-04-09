/**
 * THIS FILE IS USED FOR TESTING PURPOSES, OR FOR MANUALLY ADDING/REMOVING OBJECTS
 */

require("dotenv").config();
const process = require("process");

const mongoose = require("mongoose");
const Player = require("../schemas/player.js");

mongoose.connect(process.env.MONGO_URI);

run();

async function run() {
  const find = await Player.findOne({ userId: "310812771971235841" });
  if (find) {
    console.log("Player is already found.");

    find.weight.bedrock += 1;
    console.log("Adding 1 weight to bedrock.");
    await find.save();

    console.log(find.findTotalWeight());
    console.log(find.findWeightValues());
    console.log(find.findOreIndex(4));
  } else {
    const newPlayer = await Player.create({
      userId: "310812771971235841",
      guildId: "648369787453308928",
      userName: "tensofu",
      coins: 100,
      weight: {
        wood: 10,
        stone: 10,
        coal: 10,
        iron: 10,
        gold: 10,
        diamond: 10,
        emerald: 10,
      },
    });

    console.log(newPlayer);
    console.log("Player is registered!");
  }

  console.log("Finished!");
  process.exit(0);
}
