import express from "express"
import PlaylistsCtrl from "./playlists.controller.js";

const router = express.Router()

console.log("good?")

// router.route("/").get(PlaylistsCtrl.apiGetPlaylists)
router.route("/").get((req, res) => res.send("hello world"))

export default router