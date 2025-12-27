require('dotenv').config();
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { PORT } = process.env || 3001;
  
//conn.sync({ alter: true })
conn.sync()   
//conn.sync( {force: true})
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server listening at ${PORT}`);
    });   
  })
  .catch(err => {
    console.error('Error syncing database:', err);
    if (err.parent) {
      console.error('Parent error:', err.parent);
    }
  }); 



