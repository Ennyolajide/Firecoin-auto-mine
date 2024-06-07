const chalk = require('chalk');
const axios = require('axios');
const { urls, getHeaders, getUsernameFromAuthQuery } = require('./config');

async function fireClick(data) {
    return await axios.post(urls.click, data, { headers: getHeaders() }).then((res) => {
        const { nextUser } = res.data;
        nextUser ? logClicked(res.data) : false;
        axios.post(urls.loadState, {}, { headers: getHeaders() })
            .then((res) => {
                const { clicks, wood } = res.data;
                clicks ? logInfo(res.data) : logInfoError();
                (wood?.count < 10) ? exitProcess() : false;
            }).catch((error) => {
                logError(error);
                process.exit();
            });
    }).catch((error) => {
        logError(error);
        process.exit();
    });
}




function logInfo(object) {
    console.log(
        'User:', chalk.blue(getUsernameFromAuthQuery()),
        '| Coins:', chalk.yellow(object?.clicks),
        '| Click Bonus', chalk.green(object?.clickBonus?.bonus),
        '| Wood:', chalk.magenta(object?.wood?.count), chalk.blue('/'), chalk.green(object?.wood?.max_value),
    );
}

function logInfoError() {
    console.log(chalk.red('Error loading state'));
    process.exit();
}

function logClicked(obj) {
    console.log(
        chalk.blue('Congrats! You have passed'), chalk.green(obj?.nextUser?.name),
    );
}

function logError(error) {
    console.log(error);
}

function exitProcess() {
    console.log(chalk.red('Error || Completed. Exiting...'));
    process.exit(); //end the process
}

module.exports = { fireClick, logInfo, logInfoError, logError, exitProcess }
