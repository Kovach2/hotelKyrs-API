module.exports = function(app, pool){
    app.post("/hotel/admin/reserv-del", async (req,res) =>{
        const reservData = req.body
        try {
            console.log(reservData)

            const delData = await pool.query('SELECT * FROM reserv_hotels WHERE hotel_id = $1 AND username = $2', [reservData.hotel_id, reservData.username]);

            const updateHotel = await pool.query('SELECT * FROM hotels WHERE id = $1', [reservData.hotel_id]);

            const new_occupied_rooms = updateHotel.rows[0].occupied_rooms - delData.rows[0].count_persons / 2

            await pool.query(
                `UPDATE hotels
                 SET occupied_rooms = $1
                 WHERE id = $2`,[new_occupied_rooms,reservData.hotel_id]
              )

            await pool.query('DELETE FROM reserv_hotels WHERE hotel_id = $1 AND username = $2', [reservData.hotel_id, reservData.username]);
            res.status(200).json({code: 200, message: "OK", status: "Бронирование успешно отменено"})
        }catch(error){
            console.log(error)
            res.status(500).send({code: 500, message: "Error"})
        }
    })
}