const express = require("express")
const app = express()
const citationRouter = require("./routes/citation.router");
const citationFavorisRouter = require("./routes/citation_favoris.router");
const sequelize = require("./config/database");
const Citation = require("./models/citation");
const CitationFavoris = require("./models/citation_favoris");

const cors = require('cors');
app.use(cors());
app.use(express.json());


(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to the database!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

sequelize
  .sync({ alter: true }) 
  .then(() => {
    console.log('Tables migrated to the database');
    app.listen(3008, () => {
      console.log('Server is running on port 3008');
    });
  })
  .catch((error) => {
    console.error('Error migrating tables:', error);
  });

app.use('/api/citations',citationRouter)
app.use('/api/citations-favoris',citationFavorisRouter)

app.use(express.static('client/build'))

app.get('/', (req, res) =>{
  res.sendFile(__dirname + '/client/build/index.html')
})

