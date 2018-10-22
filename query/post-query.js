module.exports = {
    'SQL_SELECT_POST'   :   'SELECT * FROM post left join tag on tag.post_id = post.id',
    'SQL_SELECT_POST_F' :   `SELECT * FROM post left join tag on tag.post_id = post.id
                            WHERE post.title LIKE ? OR tag.name LIKE ?
                            ORDER BY ? DESC`,

}