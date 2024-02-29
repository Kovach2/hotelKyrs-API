
module.exports = function (app, pool) {
    app.get('/hotels/id', async (req, res) => {
        const hotel_id = req.query.hotel_id;
        try {
            let hotelIdsArray = [];
            if(hotel_id){
                if (hotel_id.toString().includes(",")) {
                    hotelIdsArray = hotel_id.toString().split(',').map(id => id.trim());
                }else{
                    hotelIdsArray.push(hotel_id)
                }
            }

            if (hotelIdsArray.length > 0) {
                const parameterizedValues = hotelIdsArray.map((_, index) => `$${index + 1}`).join(', ');

                const result = await pool.query(`SELECT * FROM hotels WHERE id IN (${parameterizedValues})`, hotelIdsArray);
                res.status(200).send({ code: 200, message: "OK", hotels: result.rows });
            }
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
            res.status(500).send('Внутренняя ошибка сервера');
        }
    });
}