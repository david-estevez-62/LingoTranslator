var mongoose = require('mongoose');
var _ = require('underscore');
var BeGlobal = require('node-beglobal');

var beglobal = new BeGlobal.BeglobalAPI({
  api_token: 'JINStXigmo1ELZN9SPyD9w%3D%3D'
});

var getLangCodes = function(){
      // Pull down a list of all languages

      // 
    return beglobal.languages.all(function(err,result){
      if (err) console.error(err);


      var myArray = [];
      for (var i = 0; i < result.length; i++) {

        myArray.push(result[i].to.name);

      };
      var unique = myArray.filter(function(itm,i,myArray){
        return i == myArray.indexOf(itm);
        });

      return unique    
      
      // Pull all from languages that are unique
      // var languages = _.chain(result)
      //     .pluck('from')
      //     // .pluck('name')
      //     .uniq(function(language) { return language.name; })
      //     .sortBy(function(lang){ return lang.name;})
      //     .value();

      // callback(languages);
    });
   
};

var getTranslation = function(word, fromLang, toLang, callback){

  beglobal.translations.translate(
    {text: word, from: fromLang, to: toLang},
    function(err, results){
      callback(err, results);
    }
  );
};


module.exports = {
	getLangCodes : getLangCodes,
	getTranslation : getTranslation
};