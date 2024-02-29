module.exports = function(app, pool) {
    app.post('/add', async (req, res) => {
        try {
          const { hotel_name, address, image_url, price, rooms_count, occupied_rooms, bar, kitchen, kids, park, pets, trans, wifi } = req.body;
      
          const result = await pool.query(
            'INSERT INTO hotels (hotel_name, address, image_url, price, rooms_count, occupied_rooms, bar, kitchen, kids, park, pets, trans, wifi) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)',
            [hotel_name, address, image_url, price, rooms_count, occupied_rooms, bar, kitchen, kids, park, pets, trans, wifi]
          );
      
          res.status(200).send({ code: 200, message: 'OK', status: 'Отель успешно добавлен' });
        } catch (error) {
          console.error('Ошибка при выполнении запроса:', error);
          res.status(500).send('Внутренняя ошибка сервера');
        }
      });
}
