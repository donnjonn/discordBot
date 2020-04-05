var unirest = require("unirest");

module.exports = function handleCovid19StatusRequest(data, splittedMessage) {

    if (splittedMessage[1] === '--help') {
        data.channel.send('Please type Covid19 with the country to get statistacs. Example: Covid19 Zimbabwe');

    } else {
        var req = unirest("GET", "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats");
        var country = splittedMessage[1];
        country = country.charAt(0).toUpperCase() + country.slice(1)
        if (splittedMessage.length > 2) {
            req.query({
                "country": splittedMessage[1] + ' ' + splittedMessage[2]
            });
            this.country = splittedMessage[1] + ' ' + splittedMessage[2];
        } else {
            req.query({
                "country": splittedMessage[1]
            });
        }
        req.headers({
            "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
            "x-rapidapi-key": "85b0871044mshc0ddbf25a9c1c53p130e5fjsnb72a111bd4e7"
        });
        req.end(function (res) {
            if (res.error) throw new Error(res.error);
            //var amountDeaths;
            var obj = {
                country: '',
                confirmed: 0,
                lastUpdate: '',
                deaths: 0,
                recovered: 0
            };
            for (const re of res.body.data.covid19Stats) {
                console.log(re);
                obj.confirmed += re.confirmed;
                obj.deaths += re.deaths;
                obj.recovered += re.recovered;
                obj.lastUpdate = re.lastUpdate;

            }
            data.channel.send('Country: ' + splittedMessage[1]);
            data.channel.send('Confirmed Case: ' + obj.confirmed);
            data.channel.send('Deaths Case: ' + obj.deaths);
            data.channel.send('Recoverd Case: ' + obj.recovered);
            data.channel.send('Last Update: ' + obj.lastUpdate);
            //  console.log(res.body.data.covid19Stats);
        })
    }

};
