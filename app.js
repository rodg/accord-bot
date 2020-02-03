const tmi = require('tmi.js');

const fs = require('fs');

// Define configuration options
const opts = JSON.parse(fs.readFileSync('.env.json'));

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);
//client.on('hosted', onHostedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { 
    return;
  } // Ignore messages from the bot
  // Remove whitespace from chat message
  //console.log(context);
  const commandName = msg.trim();
  // If the command is known, let's execute it
  switch (commandName){
    case '!dice':
        const num = rollDice();
        client.say(target, `You rolled a ${num}`);
        console.log(`* Executed ${commandName} command`);
        break;
    case '!discord':
        client.say(target, 'Drakengard Speedrun Discord: https://discordapp.com/invite/y4D4KW8');
        console.log(`* Executed ${commandName} command`);
        break;
    case 'GRUN':
        client.say(target, "GRUN");
        console.log(`* Executed ${commandName} command`);
        break;
    case '!race':
        client.say(target, "link to race: http://www.multitwitch.tv/DrDevinRX/percyz01/rodg1400");
        console.log(`* Executed ${commandName} command`);
        break;
    case '!srdc':
        client.say(target, "Rod's srdc page: https://www.speedrun.com/user/RodG");
        console.log(`* Executed ${commandName} command`);
        break;
    case '!Loren':
    case '!loren':
        client.say(target, "Loren is a dude, hes on my bed. Yeet!");
        console.log(`* Executed ${commandName} command`);
        break;
    case '!info':
        client.say(target, 
            "I'm a bot made by RodG. Try !srdc or !discord." + 
            "My source code is here: github.com/rodg/accord-bot");
        console.log(`* Executed ${commandName} command`);
        break;
    case 'HahaCar':
        client.say(target, "HahaCar");
        console.log(`* Executed ${commandName} command`);
        break;
    case 'hi accord':
        client.say(target, "hi! i'm a whatever kaine thinks sounds best ;)");
        console.log(`* Executed ${commandName} command`);
        break;
    default: 
        console.log(`* ${context.username}: ${commandName}`);
  }

}

// Function called when the "dice" command is issued
function rollDice () {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}

