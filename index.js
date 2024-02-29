const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');



const app = express();

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Hotels',
    password: '1234',
    port: 9999
});

app.use(express.json());
app.use(cors());


// Hotels
require("./src/controllers/hotels/getAllHotels")(app, pool)
require("./src/controllers/hotels/getHotelsById")(app, pool)
require("./src/controllers/reserv/reservHotel")(app, pool)
require("./src/controllers/reserv/getReservHotel")(app, pool)



require("./src/controllers/hotels/addHotel")(app, pool)
require("./src/controllers/hotels/delHotel")(app, pool)
require("./src/controllers/hotels/updateHotel")(app, pool)
require("./src/controllers/hotels/likeHotel")(app, pool)


// Users
require("./src/controllers/users/login")(app, pool)
require("./src/controllers/users/register")(app, pool)

// admin
require("./src/controllers/reserv/admin/delReservHotels")(app, pool)
require("./src/controllers/reserv/admin/getReservHotels")(app, pool)


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});


module.exports = {app, pool}