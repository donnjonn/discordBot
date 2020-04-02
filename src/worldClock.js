var Request = require("request");
var examples = ['Europe/Brussels', 'Pacific/Auckland', 'Australia/Sydney', 'Africa/Bissau', 'America/Los_Angeles'];

module.exports = function handleTimeCommand(data, splittedMessage) {

    var location = splittedMessage[1];
    if (location === '--help') {
        data.channel.send('Hi ' + user + ', please type Time and add the time zone to it. Here is a list of some timezones that can be used.');
        for (const example of examples) {
            data.channel.send('\n' + example)
        }
    } else {
        Request.get("http://api.timezonedb.com/v2.1/get-time-zone?key=1TR97FP9GPDQ&format=json&by=zone&zone=" + location, (error, response, body) => {
            var parsedJson = JSON.parse(body);
            if (parsedJson.status === 'FAILED') {
                data.channel.send('Whoops, wrong input... Please use Time --help for more information');
            } else {
                console.log(parsedJson);
                data.channel.send('Hi ' + user + ', here is the date: ' + parsedJson.formatted);
            }
        });
    }
};