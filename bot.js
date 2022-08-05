const tmi = require('tmi.js');

var json = require('./scores.json')

// Define configuration options
const opts = {
  identity: {
    username: <username>,
    password: <authorization token>
  },
  channels: [
    <channel_name>
  ]
};

// Create a client with our options
const client = new tmi.client(opts);
// Connect to Twitch:
client.connect();

// Register our event handlers (defined below)
// client.on('message', onMessageHandler);
// client.on('connected', onConnectedHandler);

client.on('message', (channel, tags, message, self) => {
    if(self || !message.startsWith('!')) {
        return;
    }

  const args = message.slice(1).split(' ');
  const command = args.shift().toLowerCase();

  if (command === 'sc') {
    //client.say(channel, `@${tags.username}, you said: "${args.join(' ')}"`);
    const score = findScore();
    if (score != 0)
        client.say(channel, `@${tags.username}, her score on "${args.join(' ')}" is ${score}`);
    else 
        client.say(channel, `@${tags.username}, that song is not on Just Dance 2022!`);
  }
  if (command === 'raid') {
      client.say(channel, <raid message>);
  }
  if (command === 'subraid') {
      client.say(channel, <raid message>);
  }

  function findScore() {
    const songName = `${args.join(' ')}`;
      for (i in json.TopScores){
          for (j in json.TopScores[i]) {
            if(json.TopScores[i].songName == songName) {
               return json.TopScores[i].score;
            }
          }
      }
      return 0;
  }

});

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
 }
