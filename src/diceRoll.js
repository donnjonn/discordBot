module.exports = function diceRoll(data, splittedWords) {
    if (splittedWords[0].toUpperCase() === 'DICE') {
        if (splittedWords.size() > 0) {

        }
        data.channel.send(oneLinerJoke.getRandomJoke().body);
    }
};