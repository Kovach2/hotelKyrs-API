module.exports = function(app, pool) {
    app.put('/update/:id', async (req, res) => {
        const id = req.params.id;
        const { hotel_name, address, image_url, price, rooms_count, occupied_rooms, bar, kitchen, kids, park, pets, trans, wifi } = req.body;

        const updateFields = [];
        const values = [];
        let valueIndex = 1;
      
        if (isNaN(id)) {
          res.status(400).json({ code: 400, message: 'Некорректный формат id' });
          return;
        }
      
        // Проверка наличия каждого поля и добавление его в массив
        if (hotel_name !== undefined) {
          updateFields.push(`hotel_name = $${valueIndex}`);
          values.push(hotel_name);
          valueIndex++;
        }
      
        if (address !== undefined) {
          updateFields.push(`address = $${valueIndex}`);
          values.push(address);
          valueIndex++;
        }
      
        if (image_url !== undefined) {
          updateFields.push(`image_url = $${valueIndex}`);
          values.push(image_url);
          valueIndex++;
        }
      
        if (price !== undefined) {
          updateFields.push(`price = $${valueIndex}`);
          values.push(price);
          valueIndex++;
        }
      
        if (rooms_count !== undefined) {
          updateFields.push(`rooms_count = $${valueIndex}`);
          values.push(rooms_count);
          valueIndex++;
        }
      
        if (occupied_rooms !== undefined) {
          updateFields.push(`occupied_rooms = $${valueIndex}`);
          values.push(occupied_rooms);
          valueIndex++;
        }
      
        if (bar !== undefined) {
          updateFields.push(`bar = $${valueIndex}`);
          values.push(bar);
          valueIndex++;
        }
      
        if (kitchen !== undefined) {
          updateFields.push(`kitchen = $${valueIndex}`);
          values.push(kitchen);
          valueIndex++;
        }
      
        if (kids !== undefined) {
          updateFields.push(`kids = $${valueIndex}`);
          values.push(kids);
          valueIndex++;
        }
      
        if (park !== undefined) {
          updateFields.push(`park = $${valueIndex}`);
          values.push(park);
          valueIndex++;
        }
      
        if (pets !== undefined) {
          updateFields.push(`pets = $${valueIndex}`);
          values.push(pets);
          valueIndex++;
        }
      
        if (trans !== undefined) {
          updateFields.push(`trans = $${valueIndex}`);
          values.push(trans);
          valueIndex++;
        }
      
        if (wifi !== undefined) {
          updateFields.push(`wifi = $${valueIndex}`);
          values.push(wifi);
          valueIndex++;
        }
      
        const updateQuery = `
        UPDATE hotels
        SET ${updateFields.join(', ')}
        WHERE id = $${valueIndex}
      `;
      
      try {
        const result = await pool.query(updateQuery, [...values, id]);
        const hotelUpdate = await pool.query('SELECT * FROM hotels WHERE id = $1', [id]);
      
        if(hotelUpdate.rowCount > 0){
          res.status(200).json({
            code: 200,
            message: 'Запись успешно обновлена',
            updatedHotel: hotelUpdate.rows,
          });
        }else{
          res.status(404).json({
            code: 404,
            message: 'Отель не найден',
          });
        }
      
      } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        res.status(500).json({ code: 500, message: 'Внутренняя ошибка сервера' });
      }
      });
}

