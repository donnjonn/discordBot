var Sentiment = require('sentiment');
var sentimentReader = new Sentiment();
var badWordResponses = ['RUDE!',
    'THAT SO MEAN!',
    'Please be nice...', 'I do not like your attitude'];

var goodWordResponses = ['These are some nice words.. Thanks ',
    'You are a nice person ',
    'Thank you for being nice to me ', 'You deserve a medal '];


module.exports = function checkSentiment(data, text) {
    if (text.toUpperCase().includes('BOT') || text.toUpperCase().includes('ROBOT') || text.toUpperCase().includes('WorldClock')) {
        console.log('Entered here');
        console.log(sentimentReader.analyze(text));
        if (sentimentReader.analyze(text).comparative < 0) {
            var randomNr = Math.round(Math.random() * (badWordResponses.length -1));
            data.channel.send(badWordResponses[randomNr]);
        }
        if (sentimentReader.analyze(text).comparative > 0) {
            var randomNr = Math.round(Math.random() * (goodWordResponses.length -1));

            data.channel.send(goodWordResponses[randomNr] + data.author.username);
        }

        
    }
};


