module.exports = function(app, pool){



    app.get("/hotel/admin/account-reserv", async (req,res) =>{

        await pool.query(`
        CREATE TABLE IF NOT EXISTS reserv_hotels (
          hotel_id integer,
          count_persons integer,
          reserv_price integer,
          username text
        )`);

        try {
            const reservHotels = await pool.query(`SELECT * FROM reserv_hotels`)
            res.status(200).json({code: 200, message: "OK", result: reservHotels.rows})
        }catch(error){
            console.log(error)
            res.status(500).json({code: 500, message: "ERROR"})
        }
    })
}