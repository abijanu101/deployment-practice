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
    if (isConnected)
        return next();
    
    if (pendingRequest)
        await pendingRequest;
    else
        pendingRequest = mongoose.connect(process.env.MONGO_URI);

    await pendingRequest;
    pendingRequest = null;

    if (isConnected)
        return next();    
    res.status(500).send({ msg: 'Could Not Connect to DB' });
}
module.exports = connect;