
var friendData = require("../data/friendData");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(friendData);
  });

  

  app.post("/api/friends", function(req, res) {
     
      var userInfo = req.body;
      var MINDIFF = 99999999;
      var matchedIndex = -1; 
      //friendData.push(userInfo);
      for(var i=0;i<friendData.length;i++){
        if(friendData[i].name !== userInfo.name && 
           friendData[i].photo !== userInfo.photo){
          var scoreDiff = 0;
          for(var j=0;j<10;j++){
            scoreDiff += Math.abs(userInfo.scores[j] - friendData[i].scores[j]);

          }
          if(scoreDiff < MINDIFF){
            MINDIFF = scoreDiff;
            matchedIndex = i;
          }   
        }

      }
      
      friendData.push(userInfo);
      console.log(friendData[matchedIndex].name)
      console.log(friendData[matchedIndex].photo);

      res.json({name:friendData[matchedIndex].name,
                image:friendData[matchedIndex].photo});
    
    
  });


  app.post("/api/clear", function() {
    // Empty out the arrays of data
    friendData = [];
    

    console.log(friendData);
  });
};
