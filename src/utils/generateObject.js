/**
 * THIS FILE IS USED FOR TESTING PURPOSES, OR FOR MANUALLY ADDING/REMOVING OBJECTS
 */

require("dotenv").config();
const process = require("process");

const mongoose = require("mongoose");
const Player = require("../schemas/player.js");
const Ore = require("../schemas/ores.js");
const mineWeight = require("../schemas/mineWeight.js");
const mineRank = require("../schemas/mineRanks.js");

mongoose.connect(process.env.MONGO_URI);

async function updateOreList(oreList) {
  for (const ore of oreList) {
    try {
      await Ore.findOneAndUpdate({ name: ore.name }, ore, {
        new: true,
        upsert: true,
      });

      console.log(`Successfilly updated ${ore.name}!`);
    } catch (error) {
      console.log(`Duplicate entry was attempted.`);
      continue;
    }
  }
}

async function updateBaseWeights(baseWeightList) {
  for (const object of baseWeightList) {
    try {
      const targetOre = await Ore.findOne({ name: object.name });
      if (targetOre) {
        await mineWeight.findOneAndUpdate(
          { ore: targetOre },
          {
            isBase: true,
            ore: targetOre,
            weightValue: object.weight,
          },
          {
            new: true,
            upsert: true,
          }
        );
        console.log(
          `Successfully updated ${object.name} to base weight of ${object.weight}!`
        );
      } else {
        console.log(`${object.name} could not be found.`);
        continue;
      }
    } catch (error) {
      console.log(`Error when adding base weights: ${error}`);
    }
  }
}

async function findBaseWeights() {
  try {
    const weights = await mineWeight.find({ isBase: "true" });
    return weights;
  } catch (error) {
    console.log(
      `Error has occurred when fetching all base weights: ${error.stack}`
    );
  }
}

async function updatePlayers() {
  try {
    const weights = await mineWeight.find({ isBase: "true" });
    const players = await Player.find();
    for (const player of players) {
      // player.power = 0;

      // player.inventory = [0];

      // player.rank = { level: 0, name: "F", cost: 0 };

      // for (let i = 0; i < weights.length; i++) {
      //   player.weightModifiers.push({ flat: weights[i], multiplier: 1 });
      // }

      player.fun.rpsCount = 0;
      player.fun.rpsWins = 0;
      player.fun.rpsLosses = 0;
      player.fun.rpsTies = 0;

      await player.save();
    }
    console.log(`Successfully updated all players!`);
  } catch (error) {
    console.log(`Error when updating players: ${error.stack}`);
  }
}

async function updateMineRanks(mineRanks) {
  for (const rank of mineRanks) {
    try {
      await mineRank.findOneAndUpdate({ name: rank.name }, rank, {
        new: true,
        upsert: true,
      });

      console.log(`Successfilly updated ${rank.name} rank!`);
    } catch (error) {
      console.log(`Error adding ranks: ${error}.`);
      continue;
    }
  }
}

async function run() {
  const find = await Player.findOne({ userId: "310812771971235841" });
  if (find) {
    console.log("Player is registered!");
  } else {
    console.log(`User not found.`);
  }
  console.log("Finished!");

  const ranks = [
    { level: 0, name: "F", cost: 0 },
    { level: 1, name: "D", cost: 2500 },
    { level: 2, name: "C", cost: 10000 },
    { level: 3, name: "B", cost: 50000 },
    { level: 4, name: "A", cost: 20000 },
    { level: 5, name: "S", cost: 1000000 },
    { level: 6, name: "S+", cost: 10000000 },
    { level: 7, name: "???", cost: 50000000 },
  ];

  const ores = [
    { name: "dirt", minValue: 1, maxValue: 7 },
    { name: "stone", minValue: 5, maxValue: 15 },
    { name: "coal", minValue: 20, maxValue: 40 },
    { name: "copper", minValue: 25, maxValue: 50 },
    { name: "iron", minValue: 45, maxValue: 85 },
    { name: "gold", minValue: 80, maxValue: 135 },
    { name: "quartz", minValue: 150, maxValue: 265 },
    { name: "diamond", minValue: 245, maxValue: 375 },
    { name: "emerald", minValue: 625, maxValue: 3275 },
    { name: "bedrock", minValue: 8775, maxValue: 12250 },
  ];

  const bases = [
    { name: "dirt", weight: 15 },
    { name: "stone", weight: 40 },
    { name: "coal", weight: 60 },
    { name: "copper", weight: 20 },
    { name: "iron", weight: 40 },
    { name: "gold", weight: 25 },
    { name: "quartz", weight: 15 },
    { name: "diamond", weight: 6 },
    { name: "emerald", weight: 3 },
    { name: "bedrock", weight: 1 },
  ];

  await updatePlayers();

  // await updateMineRanks(ranks);
  // console.log(`Successfully updated ranks to mineRank Schema!`);

  // await updateOreList(ores);
  // console.log("Finished adding ores to Ore Schema!");

  // await updateBaseWeights(bases);
  // console.log("Finished adding base weights to mineWeight Schema!");

  // await updatePlayers();
  // console.log(`Successfully updated all players with new defaults.`);

  process.exit(0);
}

run();

/*
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
*/
