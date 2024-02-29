module.exports = function(app,pool){
    app.post("/hotel/reserv", async (req,res) =>{
        const reservData = req.body

        await pool.query(`
        CREATE TABLE IF NOT EXISTS reserv_hotels (
          hotel_id integer,
          count_persons integer,
          reserv_price integer,
          username text
        )`);
  

        try {

            const updateHotel = await pool.query(
              'SELECT DISTINCT id FROM hotels WHERE id = $1', [reservData.hotel_id]
            )

            const userExist = await pool.query(
              'SELECT * FROM reserv_hotels WHERE username = $1 AND hotel_id = $2', [reservData.username, reservData.hotel_id]
            )

            if (updateHotel.rows.length > 0) {
              const hotelId = updateHotel.rows[0].id;

              if(reservData.freeRooms < Math.ceil(reservData.count_persons / 2)){
                res.status(200).json({ code: 200, message: 'BAD', status: false });
              }else{


                let newOccupied_rooms

                if(userExist.rows.length > 0){

                  const newPrice = userExist.rows[0].reserv_price + reservData.reserv_price
                  const newPersons = userExist.rows[0].count_persons + reservData.count_persons

                  await pool.query(
                    `UPDATE reserv_hotels
                     SET reserv_price = $1, count_persons = $2 
                     WHERE hotel_id = $3`,[newPrice,newPersons,hotelId]
                  )
                  newOccupied_rooms = Math.ceil(newPersons / 2)

                }else{
                  await pool.query(
                    'INSERT INTO reserv_hotels (username, hotel_id, count_persons, reserv_price) VALUES ($1, $2, $3, $4)',
                    [reservData.username, hotelId, reservData.count_persons, reservData.reserv_price]
                  )
                  newOccupied_rooms = Math.ceil(reservData.count_persons / 2) + reservData.occupied_rooms
                }
                
                
                await pool.query(
                 `UPDATE hotels
                  SET occupied_rooms = $1
                  WHERE id = $2`,[newOccupied_rooms,hotelId]
                )

                res.status(200).send({ code: 200, message: 'OK', status: 'Отель успешно забронирован' });
              }
            } else {
              console.log('Отель с указанным id не найден.');
            }
          } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
            res.status(500).send('Внутренняя ошибка сервера');
          }
    })
}
