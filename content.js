/*
 Term Frequency–Inverse Document Frequency (tf-idf) is implemented to determine
 how important a word (or words) is to a document relative to a corpus.
 */

var file = 'test.json';
var drop_retweets = true;


// =====================================================================================

var fs = require('fs')
    , byline = require('byline')
    , stream = fs.createReadStream(file)
    , stream = byline.createStream(stream)
    ;


stream.on('data', function(line) {

    try{
        var data = JSON.parse(line);


        if(drop_retweets === true){
            if(data.twitter !== undefined && data.twitter.retweet !== undefined){
                return;
            }
        }

        if(data.interaction.content)
            console.log(data.interaction.content);


    } catch (e) {
        console.log('ERROR: ' + e);
        return;
    }

});



stream.on('end', function() {
    console.log("Done.");
});