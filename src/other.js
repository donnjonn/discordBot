var Discord = require('discord.js');
var auth = require('../auth.json');
var languageCheck = require("./appropriateLanguage");
var worldClockHelper = require("./worldClock.js");
var covide19Response = require("./covid19handler");
var sentimentCheck = require("./sentiment");
var oneLineJoke = require("./oneLinerJokes");


const bot = new Discord.Client();
const TOKEN = auth.token;
bot.login(TOKEN);


var badWords = ['STUPID', 'DUMB', 'SILLY', 'SERVANT', 'SHIT'];


var greetWords = ['Hello', 'YOOOO', 'Hi', 'Whats up', 'wadup', 'Hey' ];
var greetWordResponses = [''];


var niceWords = [''];
var niceWordResponse = [''];


bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', (data) => {
    user = data.author.username;
    var splittedMessage = data.content.split(' ');
    languageCheck(data);
    if (splittedMessage[0].toUpperCase() === 'TIME') {
        worldClockHelper(data, splittedMessage);
    }

    if (splittedMessage[0].toUpperCase() === 'COVID19') {
       covide19Response(data,splittedMessage);
    }

    if (data.content.toUpperCase().includes('LOVE') && user !== 'WorldClock') {
        data.channel.send('Love is healty,  ' + user );
    }

    if (data.content.toUpperCase() === 'HI ROBOT') {
        var randomNr = Math.round(Math.random() * 5);
        data.channel.send(greetWords[randomNr] + ' ' + user);
    }

    sentimentCheck(data, data.content);
    oneLineJoke(data);

/*    if (splittedMessage.length > 1 && data.content.toUpperCase().includes('ROBOT')) {


        if (splittedMessage[0].toUpperCase() + ' ' + splittedMessage[1].toUpperCase() === 'HI ROBOT') {
            data.channel.send('Wadup ' + user);
        }

        if (splittedMessage[0].toUpperCase() + ' ' + splittedMessage[1].toUpperCase() === 'DUMB ROBOT') {
            data.channel.send('THAT SO MEAN!');
        }

        if (splittedMessage[0].toUpperCase() + ' ' + splittedMessage[1].toUpperCase() === 'SILLY ROBOT') {
            data.channel.send('WHY YOU LIKE THIS TO ME?');
        }
    }*/




});