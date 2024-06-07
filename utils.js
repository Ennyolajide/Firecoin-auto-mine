function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function buildClicks(increment){
    return { clicks: increment };
}

module.exports = { getRandom, buildClicks }