require('dotenv').config();
const axios = require('axios');
const { urls, getHeaders } = require('./config.js');
const { getRandom, buildClicks } = require('./utils.js');
const { fireClick, logInfo, logInfoError, logError, exitProcess } = require('./requests.js');

let increment = 0;
const env = process.env;
const minClick = parseInt(env.MIN_CLICK);
const maxClick = parseInt(env.MAX_CLICK);
const minInterval = parseInt(env.MIN_INTERVAL);
const maxInterval = parseInt(env.MAX_INTERVAL);
// const username = getUsernameFromAuthQuery(env.AUTH_QUERY);


async function main() {
    axios.post(urls.loadState, {}, { headers: getHeaders() })
        .then((res) => {
            const { clicks, wood } = res.data;
            clicks ? logInfo(res.data) : logInfoError();
            
            increment = clicks;

            function handleFireClick() {
                increment += getRandom(minClick, maxClick);
                (wood?.count > 0) ? fireClick(buildClicks(increment)) : exitProcess();
            }

            handleFireClick();

            setInterval(handleFireClick, (getRandom(minInterval, maxInterval) * 1000));
        })
        .catch (error => {
    logError(error);
});
}

main();