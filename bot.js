var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var fs = require('fs');
// Configure logger settings
logger.remove(new logger.transports.Console());
logger.level = 'debug';
logger.add(new logger.transports.Console(), {
  colorize: true
});

// Initialize Discord Bot
var bot = new Discord.Client({
  token: auth.token,
  autorun: true
});
var interval = 1000;
var timerId;
bot.on('ready', function (evt) {
  logger.info('Connected');
  logger.info('Logged in as: ');
  logger.info(bot.username + ' - (' + bot.id + ')');
  // setInterval(morningMessage, interval);

  timerId = setTimeout(morningMessage, interval);

});
morningMessage = function () {
  const date = new Date;
  const fsDate = new Date(fs.readFileSync("date", "utf8"));
  const hours = date.getHours();
  const fsToday = fsDate.getDate() + '.' + (fsDate.getMonth() + 1);
  const today = date.getDate() + '.' + (date.getMonth() + 1);

  const channelID = '512898722250752003';
  if (today !== fsToday && hours === 8) {
    interval = 1000 * 60 * 60 * 24;
    clearTimeout(timerId);
    timerId = setTimeout(morningMessage, interval);
    fs.writeFileSync('date', date, "utf8");
    console.log('fsToday');
    bot.sendMessage({
      to: channelID,
      message: '@everyone Доброе утро ребятки! Как спалось?'
    });
  }
};


bot.on('message', function (user, userID, channelID, message, evt) {
  // Our bot needs to know if it will execute a command
  // It will listen for messages that will start with `!`
  if (message.substring(0, 1) == '!') {
    var args = message.substring(1).split(' ');
    var cmd = args[0];

    args = args.splice(1);
    switch(cmd) {
      // !ping
      case 'ping':
        bot.sendMessage({
          to: channelID,
          message: 'ты чего это??'
        });
        break;
      // Just add any case commands if you want to..
    }
  }
});