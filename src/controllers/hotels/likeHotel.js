module.exports = function(app, pool){
    app.post("/likeHotel", async (req, res) => {
        const { username } = req.body;
      
      await pool.query(`
      CREATE TABLE IF NOT EXISTS like_hotels (
        hotel_id integer,
        user_id integer
      )`);

        
      try {
        const user = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        if(user.rows.length > 0)  {
          const exist = await pool.query("SELECT * FROM like_hotels WHERE user_id = $1", [user.rows[0].id]);
          res.status(200).send({ code: 200, message: "OK", status: exist.rows });
        }else{
          res.status(404)
        }
      } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        res.status(500).send('Внутренняя ошибка сервера');
      }
      });


    app.post("/likeHotel/add", async (req, res) =>{

        await pool.query(`
        CREATE TABLE IF NOT EXISTS like_hotels (
          hotel_id integer,
          user_id integer
        )`);

        const {hotel_id, username} = req.body
        try{
            const user_id = await pool.query("SELECT * from users WHERE username = $1", [username])

            const exist = await pool.query("SELECT * from like_hotels WHERE user_id = $1 AND hotel_id = $2", [user_id.rows[0].id, hotel_id])
            if(exist.rows.length > 0){
                const delLikedHotel = await pool.query("DELETE FROM like_hotels WHERE user_id = $1 AND hotel_id = $2", [user_id.rows[0].id, hotel_id])
                res.status(200).send({code: 200, message:"OK", status: false});
            }else{
                const result = pool.query("INSERT INTO like_hotels (hotel_id, user_id) VALUES ($1, $2)", [hotel_id, user_id.rows[0].id])
                res.status(200).send({code: 200, message:"OK", status: true});
            }

        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
            res.status(500).send('Внутренняя ошибка сервера');
        }
    })
}