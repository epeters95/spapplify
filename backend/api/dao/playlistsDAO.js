let playlists
let defaultUserId = "baesnoops"
export default class PlaylistsDAO {
    static async injectDB(conn) {
        if (playlists) {
            return
        }
        try {
            playlists = await conn.db(process.env.SPAPPLIFY_NS).collection("playlists")
        } catch (e) {
            console.error(
                `Failed to connect to collection handle in PlaylistsDAO: ${e}`,
            )
        }
    }

    static async createDBcollection(conn) {
        console.log("Creating db ...")
        try {
            await conn.db(process.env.SPAPPLIFY_NS).createCollection("playlists")
        } catch (e) {
            console.error(
                `Failed to create collection in PlaylistsDAO: ${e}`,
            )
        }
    }

    static async getPlaylists({
        filters = null,
        page = 0,
        playlistsPerPage = 20,
    } = {}) {
        let query
        if (filters) {
            if ("name" in filters) {
                query = { $text: { $search: filters["name"] } }
            } else if ("groupName" in filters) {
                query = { "groupName": { $eq: filters["groupName"] } }
            }
        }
        let cursor

        try {
            cursor = await playlists
                .find(query)
        } catch (e) {
            console.error(`Failed to issue find command, ${e}`)
            return { playlistsList: [], totalNumPlaylists: 0}
        }

        const displayCursor = cursor.limit(playlistsPerPage).skip(playlistsPerPage * page)

        try {
            const playlistsList = await displayCursor.toArray()
            const totalNumPlaylists = await playlists.countDocuments(query)
            return {playlistsList, totalNumPlaylists}
        } catch (e) {
            console.error("Failed to count documents or convert cursor")
            return { playlistsList: [], totalNumPlaylists: 0}
        }
    }

}