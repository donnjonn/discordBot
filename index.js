var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var Request = require("request");
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});

var options = {
    host: '',
    port: 80,
    path: '',
    method: 'GET'
};

Request.get("http://api.timezonedb.com/v2.1/get-time-zone?key=1TR97FP9GPDQ&format=json&by=zone&zone=" + "Europe/Brussels", (error, response, body) => {
    if (error) {
        return console.dir(error);
    }
    var parsedJson = JSON.parse(body);
    console.log(parsedJson.formatted);
});

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    console.log(message);
    var args = message.split(' ');

    if (args[0] === 'Time') {
        var cmd = args[1];
        console.log(cmd);
        console.log(args);

        var location = args[1];
        console.log(args[1]);
        if (location === '--help') {
            var examples = ['Europe/Brussels', 'Pacific/Auckland', 'Australia/Sydney', 'Africa/Bissau', 'America/Los_Angeles'];
            bot.sendMessage({
                to: channelID,
                message: 'Hi ' + user + ', please type Time and add the time zone to it. Here is a list of some timezones that can be used.'
            });

            for (const example of examples) {
                bot.sendMessage({
                    to: channelID,
                    message: '\n' + example
                });
            }
        } else {
            Request.get("http://api.timezonedb.com/v2.1/get-time-zone?key=1TR97FP9GPDQ&format=json&by=zone&zone=" + location, (error, response, body) => {
                var parsedJson = JSON.parse(body);

                if (parsedJson.status === 'FAILED') {
                    bot.sendMessage({
                        to: channelID,
                        message: 'Whoops, wrong input... Please use Time --help for more information'
                    });
                } else {
                    console.log(parsedJson);
                    bot.sendMessage({
                        to: channelID,
                        message: 'Hi ' + user + ', here is the date: ' + parsedJson.formatted
                    });
                }

            });
        }

    }
});