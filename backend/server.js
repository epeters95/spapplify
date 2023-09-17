import express from "express"
import cors from "cors"
import playlists from "./api/playlists.route.js"

console.log("Good to go")
const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/playlists/", playlists);
// app.use("*", (req, res) => res.status(404).json({error: "Not found"}));

export default app;