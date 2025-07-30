let isConnected = false;
let pendingRequest = null;

const mongoose = require('mongoose');
mongoose.connection.on('connected', () => {
    isConnected = true;
});
mongoose.connection.on('disconnected', () => {
    isConnected = false;
});
mongoose.connection.on('error', () => {
    isConnected = false;
})

async function connect(req, res, next) {
    console.log(`Mongo URI: mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PW}@${process.env.MONGO_HOST}/`)

    if (isConnected)
        return next();

    if (pendingRequest)
        await pendingRequest;
    else
        pendingRequest = mongoose.connect(
            `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PW}@${process.env.MONGO_HOST}/`);

    await pendingRequest;
    pendingRequest = null;

    if (isConnected)
        return next();
    res.status(500).send({ msg: 'Could Not Connect to DB' });
}
module.exports = connect;