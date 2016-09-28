app.factory('api', function ($http) {
  var WIKIDATA_API = 'https://www.wikidata.org/w/api.php';
  var COMMONS_API  = 'https://commons.wikimedia.org/w/api.php';

  return {

    entity : function(id) {
      var params = {
        'action'    : 'wbgetentities',
        'ids'       : id,
        'format'    : 'json',
        'callback'  : 'JSON_CALLBACK',
        'languages' : 'en|fr',
        'props'     : 'labels|descriptions|aliases|claims'
      };
      return $http.jsonp(WIKIDATA_API, { params : params });
    },

    search : function(q, lang) {
      var params = {
        'action' : 'wbsearchentities',
        'search' : q,
        'format' : 'json',
        'language' : lang,
        'type' : 'item',
        'callback' : 'JSON_CALLBACK'
      };
      return $http.jsonp(WIKIDATA_API, { params : params });
    }
  };
});
