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
var greetWords = ['Hello', 'YOOOO', 'Hi', 'Whats up', 'wadup', 'Hey'];
var greetWordResponses = [''];


var niceWords = [''];
var niceWordResponse = [''];


bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', async (data) => {
    user = data.author.username;
    var splittedMessage = data.content.split(' ');
    if (splittedMessage[0].toUpperCase() === 'TIME') {
        worldClockHelper(data, splittedMessage);
    }
    console.log(data.channel);

    if (data.content.toUpperCase().includes('LOVE') && user !== 'WorldClock') {
        data.channel.send('Love is healty,  ' + user);
    }

    if (data.content.toUpperCase() === 'HI ROBOT') {
        var randomNr = Math.round(Math.random() * 5);
        data.channel.send(greetWords[randomNr] + ' ' + user);

    }

    if (data.content.toUpperCase() === '/JOIN') {
        console.log(data.guild);
        if (!data.guild) return;

        if (data.member.voice.channel) {
            const connection = await data.member.voice.channel.join();
        } else {
            data.channel.send('You need to join a voice channel first!');
        }
    }

    await sentimentCheck(data, data.content);
    await oneLineJoke(data);
});


bot.on('voiceStateUpdate', (oldState, newState) => {

    console.log(newState.member.user.username);
    var userName = newState.member.user.username;

    //message.guild.channels.find(channel => channel.name === "channel-name");
    let oldVoice = oldState.channelID;
    let newVoice = newState.channelID;
    if (oldVoice !== newVoice) {
        const channelNew = bot.channels.cache.get('696401597529587802');
        console.log(bot.channels.cache.get('newVoice'));
        if (oldVoice == null) {
            console.log("User joined!" + newVoice);
            channelNew.send(userName + ' has joined the call', {tts: true});
        } else if (newVoice == null) {
            console.log("User left!");
            channelNew.send(userName + ' has left the call', {tts: true});
        } else {
            channelNew.send(userName + ' has switched channels', {tts: true});
            console.log("User switched channels!");
        }
    }
});
