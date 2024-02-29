module.exports = function(app, pool){
    app.post("/hotel/account-reserv", async (req,res) =>{
        
        await pool.query(`
        CREATE TABLE IF NOT EXISTS reserv_hotels (
          hotel_id integer,
          count_persons integer,
          reserv_price integer,
          username text
        )`);


        const reservData = req.body
        try {

            const reservHotels = await pool.query(
                `SELECT DISTINCT ON (hotel_id) * FROM reserv_hotels WHERE username = $1`, [reservData.username]
            )


            const reservAll = await pool.query(
                `SELECT * FROM reserv_hotels WHERE username = $1`, [reservData.username]
            )

            if(reservHotels.rows.length > 0){
                const hotelsId = []
                reservHotels.rows.forEach(data => {
                    hotelsId.push(data.hotel_id)
                });

                res.status(200).json({code: 200, message: "OK", hotelsId: hotelsId, reservData: reservAll.rows})
            }
        

        }catch(error){
            console.log(error)
        }
    })
}