import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import PlaylistsDAO from "./api/dao/playlistsDAO.js";
dotenv.config();
const MongoClient = mongodb.MongoClient;

const port = process.env.PORT || 8000
console.log("Process: " + process.env.SPAPPLIFY_DB_URI)
MongoClient.connect(
    process.env.SPAPPLIFY_DB_URI,
    {
        maxPoolSize: 50,
        timeout: 2500,
        useNewUrlParser: true
    }
).catch(err => {
    console.error(err.stack)
    process.exit(1)
}).then(async client => {
    // await PlaylistsDAO.injectDB(client)
    console.log("Awaiting...")
    await PlaylistsDAO.createDBcollection(client)
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })
})


// async function getNextSequence(name) {
//   const result = await db.collection('counters').findOneAndUpdate(
//     { _id: name },
//     { $inc: { current: 1 } },
//     { returnOriginal: false },
//   );
//   return result.value.current;
// }
//
// function getDb() {
//   return db;
// }

// module.exports = { connectToDb, getNextSequence, getDb };