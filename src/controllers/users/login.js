module.exports = function(app, pool) {
    app.post("/users", async(req,res) =>{




        const {username, password} = req.body
      
        try {
                          
          await pool.query(`
          CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username text,
            password text
          )`);

          const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
          if(result.rows.length > 0 && result.rows[0].password == password){
            res.status(200).send({code: 200, message:"OK", status: true});
          }else{
            res.status(200).send({code: 200, message:"OK", status: false});
          }
        } catch (error) {
          console.error('Ошибка при выполнении запроса:', error);
          res.status(500).send('Внутренняя ошибка сервера');
        }
      })
}


