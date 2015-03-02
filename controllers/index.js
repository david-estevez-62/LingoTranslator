// var model = require('../models/translation.js')
var config = require('../config.js');
var BeGlobal = require('node-beglobal');

var beglobal = new BeGlobal.BeglobalAPI({
  api_token: config.apiToken
});

var indexController = {

	 index: function(req, res) {
		 res.render('index');
	  },



	  translate: function(req,res){
	 	beglobal.languages.all(function(err,result){
	      if (err) console.error(err);


	      var myArray = [];
	      for (var i = 0; i < result.length; i++) {

	        myArray.push(result[i].to.name);

	      };
	      var unique = myArray.filter(function(itm,i,myArray){
	        return i == myArray.indexOf(itm);
	        });

	      console.log(unique)

	      res.render('translate', { languages : unique } )
      
      // Pull all from languages that are unique
      // var languages = _.chain(result)
      //     .pluck('from')
      //     // .pluck('name')
      //     .uniq(function(language) { return language.name; })
      //     .sortBy(function(lang){ return lang.name;})
      //     .value();

      // callback(languages);
	    	});
		 },


	  getTranslation: function(req,res){

	    var request = req.body;

	    model.getTranslation(request.word, request.fromlanguage, request.targetlanguage,
	      function(err, results){
	        if (err){ console.log(err); }
	        res.render('translate-result', {results: results});
	    });
	  }
	  

};

module.exports = indexController;