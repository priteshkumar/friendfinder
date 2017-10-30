
var friendData = require("../data/friendData");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(friendData);
  });

  

  app.post("/api/friends", function(req, res) {

      var MINDIFF = 99999999;
      var matchedIndex = -1;
      console.log(req.body); 
      
      for(var i=0;i<friendData.length;i++){
        if(friendData[i].name !== req.body.name && 
           friendData[i].photo !== req.body.photo){
          var scoreDiff = 0;
          for(var j=0;j<10;j++){
            scoreDiff += Math.abs(parseInt(req.body.scores[j]) - friendData[i].scores[j]);

          }
          if(scoreDiff < MINDIFF){
            MINDIFF = scoreDiff;
            matchedIndex = i;
          }   
        }

      }
      
      var scoreArray = [];
      for(var i=0;i < req.body.scores.length;i++){
        scoreArray.push(parseInt(req.body.scores[i]));
      }

      console.log(scoreArray);
      var newUserinfo = {
        name:req.body.name,
        photo:req.body.photo,
        scores:scoreArray
      };

      console.log(newUserinfo);
      friendData.push(newUserinfo);
      
      console.log(friendData);
      console.log(friendData[matchedIndex].name)
      console.log(friendData[matchedIndex].photo);

      res.json({name:friendData[matchedIndex].name,
                photo:friendData[matchedIndex].photo});
    
    
  });


  app.post("/api/clear", function() {
    // Empty out the arrays of data
    friendData = [];
    

    console.log(friendData);
  });
};
