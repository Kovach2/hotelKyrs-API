module.exports = function(app, pool) {
    app.post("/users/register", async(req,res) =>{

        


        try {
          await pool.query(`
          CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username text,
            password text
          )`);

          const {username, password} = req.body
      
          const users = await pool.query('SELECT * FROM users WHERE username = $1', [username])
      
          if(users.rows.length > 0){
            res.status(200).send({code: 200, message: "Пользователь c таким именем уже зарегистрирован", exist: true});
          }else{
            const result = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)',[username,password]);
            res.status(200).send({code: 200, message: "Успешная регистрация", exist: false});
          }
      
        } catch (error) {
          console.error('Ошибка при выполнении запроса:', error);
          res.status(500).send('Внутренняя ошибка сервера');
        }
      })
      
}