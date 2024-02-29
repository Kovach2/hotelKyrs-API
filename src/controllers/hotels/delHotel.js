
module.exports = function(app, pool){
    app.delete("/del/:id", async (req, res) => {
        const id = req.params.id;
      
        try {
          const result = await pool.query('DELETE FROM hotels WHERE id = $1', [id]);
          res.status(200).json({code: 200, message:"OK", message: 'Запись успешно удалена' });
        } catch (error) {
          console.error('Ошибка при удалении записи:', error.message || error);
          res.status(500).send('Внутренняя ошибка сервера');
        }
      });
}

  