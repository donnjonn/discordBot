const oneLinerJoke = require("one-liner-joke")


module.exports = function checkSentiment(data) {
    if (data.content.toUpperCase() === 'TELL ME A JOKE') {
        data.channel.send(oneLinerJoke.getRandomJoke().body);
    }
};