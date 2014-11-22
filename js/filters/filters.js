'use strict';

/* Filters */

angular.module('UserManagment.filters', []).
  filter( 'paginate', function() {
    return function(text, page, limit) {
	
	
	if( page > 1 ) {
		page = (limit * ( page - 1 ))+1;
		limit = page + limit - 1;
	}
	//console.log( 'page:',page,'::','limit:',limit);
	 //console.log( text.slice(0,2) );
	/* Process the input and slice it to offset, limit */
	var text_st = [];
	
	angular.forEach(text, function(value, key) {
		if( (key+1) >= page && (key+1) <= limit ) {
			this.push( value );
		}
		//console.log( offset );
		//text_st.push(value);
	},text_st);
	//console.log( 'text_st',text_st);
      return text_st;
    }
  });
