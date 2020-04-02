var Filter = require("bad-words");
var checker = new Filter();
module.exports = function handleDirtyWords(data) {
    var profane = checker.isProfane(data.content);

    if (profane) {
        //data.channel.send('Language please!');
    }
};