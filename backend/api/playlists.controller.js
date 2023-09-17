import PlaylistsDAO from "./dao/playlistsDAO.js";

export default class PlaylistsController {
    static async apiGetPlaylists(req, res, next) {
        const playlistsPerPage = req.query.playlistsPerPage ? parseInt(req.query.playlistsPerPage) : 0
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if (req.query.name) {
            filters.name = req.query.name
        }
        else if (req.query.groupName) {
            filters.groupName = req.query.groupName
        }

        const { playlistsList, totalNumPlaylists } = await PlaylistsDAO.get(
            filters,
            page,
            playlistsPerPage
        )
    }
}