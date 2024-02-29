module.exports = function (app, pool) {
  app.get('/', async (req, res) => {
    try {
      await pool.query(`
      CREATE TABLE IF NOT EXISTS hotels (
        id SERIAL PRIMARY KEY,
        hotel_name text,
        address text,
        image_url text,
        price integer,
        rooms_count integer,
        occupied_rooms integer,
        bar boolean,
        kitchen boolean,
        kids boolean,
        park boolean,
        pets boolean,
        trans boolean,
        wifi boolean
      )`);


      const result = await pool.query('SELECT * FROM hotels');
      res.status(200).send({ code: 200, message: "OK", hotels: result.rows });
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
      res.status(500).send('Внутренняя ошибка сервера');
    }
  });
};
