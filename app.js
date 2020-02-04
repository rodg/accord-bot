const tmi = require('tmi.js');

const fs = require('fs');

// Define configuration options
const opts = JSON.parse(fs.readFileSync('.env.json'));

// Create a client with our options
const client = new tmi.client(opts);
var race = { racing : false, 
             gtg : false,
             runners : [] }

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
  const commandName = msg.trim().split(' ');
  // If the command is known, let's execute it
  switch (commandName[0]){
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
    case '!srdc':
        client.say(target, "Rod's srdc page: https://www.speedrun.com/user/RodG");
        console.log(`* Executed ${commandName} command`);
        break;
    case '!Loren':
    case '!loren':
        client.say(target, "Loren is a dude.");
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
    case '!newrace':
    case '!nr':
        if(context.username.match(/rodg1400/)){ //TODO make this more general and not just for me
             race.runners = commandName.slice(1) 
             race.racing = true
             msg = "Race between runners " + race.runners.join(', ')+" started."
                    + " Race link: multitwitch.tv/" +  race.runners.join('/')
        }else{
            msg = "Hey, you can't do that!"
        }
        // maybe i should just store the string....
        // then again, i could also have the bot snoop on their chats during the race...
        client.say(target, msg);
        console.log(`* Executed ${commandName} command`);
        break;
    case '!race':
        if(race.racing){
            client.say(target, 
                "Link to race: multitwitch.tv/" + race.runners.join('/'));
        } else {
           client.say(target, "There isn't currently a race going.")
        }
        console.log(`* Executed ${commandName} command`);
        break;
    case '!endrace':
    case '!er':
        if(context.username.match(/rodg1400/)){
            race.runners = [] 
            race.racing = false
            msg = "Okay, I've ended the race"
        }else{
            msg = "Hey, you can't do that!"
        }
        // maybe i should just store the string....
        // then again, i could also have the bot snoop on their chats during the race...
        client.say(target, msg);
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

