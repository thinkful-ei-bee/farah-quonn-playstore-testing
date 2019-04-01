const express = require('express');
const app = express();

const playstore = require('./playstore.js');



app.get('/apps', (req, res) => {
   const {sorting, genre} = req.query;

   if(sorting) {
    if(!['App', 'Rating'].includes(sorting)) {
      return res
        .status(400)
        .send('Sort must be one of App or rating');
    }
  }

   let results = playstore

    if(sorting) {
        results.sort((a, b) => {
            return a[sorting] > b[sorting] ? 1 : a[sorting] < b[sorting] ? -1 : 0;
        }); 
        } 
    
    if(genre) {
        if(!['Action', 'Arcade', 'Stragery', 'Casual', 'Arcade', 'Card'].includes(genre)){
            return res 
                .status(400)
                .send('Must be a genre.')
        }
    }
    if(genre){
        results = results.filter(result => {
            return result.Genres === genre
        });
    }

    
    res.send(results);
  });

  app.listen(8000, () => {
    console.log('Server started on PORT 8000');
});