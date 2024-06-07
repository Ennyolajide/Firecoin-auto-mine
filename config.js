require('dotenv').config();

const env = process.env;

const baseUrl = 'https://app2.firecoin.app/api';

function setToken() {
    return { 'Authorization': `tma ${env.AUTH_QUERY}` };
}

function getHeaders(headers = {}) {

    return {
        'Accept': '*/*',
        ...setToken(),
        'Sec-Fetch-Site': 'same-origin',
        'Accept-Language': 'en-GB,en;q=0.9',
        'Sec-Fetch-Mode': 'cors',
        'Accept-Encoding': 'gzip, deflate, br',
        'Origin': 'https://app2.firecoin.app',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
        'Referer': 'https://app2.firecoin.app/',
        //'Content-Length': '2',
        'Connection': 'keep-alive',
        'Content-Type': 'text/plain;charset=UTF-8',
        'Sec-Fetch-Dest': 'empty'
    };
}

const urls = {
    click: `${baseUrl}/click`,
    loadState: `${baseUrl}/loadState`,
}

function getUsernameFromAuthQuery() {
    const params = new URLSearchParams(env.AUTH_QUERY);
    const userParam = params.get('user');
    if (userParam) {
        const user = JSON.parse(decodeURIComponent(userParam));
        return user.username;
    }
    return null;
}


module.exports = { urls, getHeaders, getUsernameFromAuthQuery }
