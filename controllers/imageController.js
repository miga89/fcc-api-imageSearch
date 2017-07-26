//const mongoose = require('mongoose');
//const Review = mongoose.model('Review');
const axios= require('axios');
const path = require('path');
const mongoose = require('mongoose');
const Query = mongoose.model('Query');


exports.homepage = (req,res) => {
  res.sendFile(path.join(__dirname,'/../views/index.html'));
};

exports.getImageSearch = async (req,res) => {
  // determine the search term(s)
  const searchTerms = req.path.substring(17);
  // determine the entered offset
  const offset = req.query.offset || 1;

  // query from google api
  const googleKey = process.env.GOOGLEKEY;
  const googleCX = process.env.GOOGLECX;
  const googleapi = `https://www.googleapis.com/customsearch/v1?key=${googleKey}&cx=${googleCX}&searchType=image&start=${offset}&q=${searchTerms}"`;

  // make ajax request to google custom search engine
  axios.get(googleapi)
    .then(resp => {
       const data = resp.data;

       // build results data object
       let results = [];
       // build each element for the data object and add to results
       for (let i = 0; i < 10; i++){
        let result = {
          url: data.items[i].link,
          snippet: data.items[i].snippet,
          thumbnail: data.items[i].image.thumbnailLink,
          context: data.items[i].image.contextLink
        };
        results.push(result);
       }
       res.json(results);

    }).catch(err => {
      console.error(err);
    });

    // save search query and timestamp to mongoDB database
    const query = new Query({term: searchTerms.replace(/%20/g," "), when:Date.now() });
    await query.save();
};


exports.getSearchList = async (req,res) => {

  // show last 10 results
  const queries = await Query
    .find({},{'term':1, 'when':1,'_id':0})
    .limit(10)
    .sort({ when: 'desc'});;
  res.json(queries);

};

