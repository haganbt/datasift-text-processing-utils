var file = 'test.json';
var grammmmmmmm = 3;
var drop_retweets = true;
var drop_interactions_with_links = true;
var drop_low_count = 5; // drop any values with a volume count lower than this



// =====================================================================================

var fs = require('fs')
	, byline = require('byline')
	, natural = require('natural')
	, NGrams = natural.NGrams
	, results = {}
	, stream = fs.createReadStream(file)
	, stream = byline.createStream(stream)
	;


stream.on('data', function(line) {

	try{
		var data = JSON.parse(line);
	} catch (e) {
		console.log('');
		console.log('ERROR: Unable to parse JSON:  ' + e);
		console.log('');
		console.log('');
		console.log(line);
		return;
	}


	if(data.interaction === undefined || data.interaction.content === undefined)
		return;

	if(drop_retweets === true){
		if(data.twitter !== undefined && data.twitter.retweet !== undefined){
			return;
		}
	}
	
	if(drop_interactions_with_links === true){
		if(data.links !== undefined && data.links.url !== undefined){
			return;
		}
	}

	var grammed = NGrams.ngrams(data.interaction.content, grammmmmmmm);

	for(var ind in grammed){
		
		var each_string = '';
		for(var eachind in grammed[ind]){
			each_string += grammed[ind][eachind] + ' ';
		}
		
		// Drop the last space character
		each_string = each_string.slice(0, -1);
		
		// Save a results object
		results[each_string] = results[each_string] || {};
		results[each_string].count = results[each_string].count || 0;
		results[each_string].count ++;
		//results[each_string].sentiment = results[each_string].sentiment || data.salience.content.sentiment;
		results[each_string].content = results[each_string].content || data.interaction.content;
		//results[each_string].followers_count = results[each_string].followers_count || data.twitter.user.followers_count
		
	}
	
	
	
});



stream.on('end', function() {
	// Build a csv - string, count, sentiment
	var out = 'n-gram,volume,context' + "\n";
	for(var resind in results){
		if(results[resind].count >= drop_low_count){
		}	out += '"' + resind + '",' + results[resind].count  + ',"' + results[resind].content + "\"\n";
	}	
	
	// Save the file
    fs.writeFile("ngram-out-" + grammmmmmmm + '.csv', out, function(err) {
      if(err)
		console.log(err);
	}); 
});