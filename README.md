A Personal Discord Bot based off of Dr. Ratio from Honkai: Star Rail  
Primarily uses `discord.js` and `mongoose` models.
A Personal Discord Bot based off of Dr. Ratio from Honkai: Star Rail  
Primarily uses `discord.js` and `mongoose` models.

Sorry, this is just a generic discord bot.
Sorry, this is just a generic discord bot.

Linux Setup Installations:

1. Installing NVM

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
nvm install <version>     # this case 21.7.1
npm install -g npm
```

2. Install Dependencies

```
npm install -g nodemon
npm install mongoose
npm install discord.js
npm install dotenv

# installed but unused
npm install mongodb
npm install python-script
```

Commands:
`/dbreg`: User opts-in to start earning coins.  
`/bal`: User could check their personal balance of coins.
`/list`: User could check the server's ranks and balances.
`/mine`: Mines random ores to earn coins.  
`/pay <user> <amount>`: Allows the user to pay another user a set amount of coins.  
`/cf <bet>`: Flips a coin with a bet.  
`/rankup`: Allows the user to buy the next rank using coins. Higher ranks rewards the user with higher chance of obtaining quality ores when mining.

Misc Commands:  
`/meow`: Tells Dr. Ratio to meow. (low chance for a special interaction)  
`/roll <die>`: Allows the user to roll a die. Dice notation (ex. `2d6`) or any `integer` works as inputs for `<die>`.  
`/ping`: Pong.

# installed but unused

npm install mongodb
npm install python-script

```

Commands:
`/dbreg`: User opts-in to start earning coins.
`/bal`: User could check their personal balance of coins.
`/list`: User could check the server's ranks and balances.
`/mine`: Mines random ores to earn coins.
`/pay <user> <amount>`: Allows the user to pay another user a set amount of coins.
`/cf <bet>`: Flips a coin with a bet.
`/rankup`: Allows the user to buy the next rank using coins. Higher ranks rewards the user with higher chance of obtaining quality ores when mining.

Misc Commands:
`/meow`: Tells Dr. Ratio to meow. (low chance for a special interaction)
`/roll <die>`: Allows the user to roll a die. Dice notation (ex. `2d6`) or any `integer` works as inputs for `<die>`.
`/ping`: Pong.
```
