/*
 Term Frequency–Inverse Document Frequency (tf-idf) is implemented to determine how important a word (or words)
 is to a document relative to a corpus.
 */

var file = 'test.json';


// =====================================================================================

var fs = require('fs')
    , byline = require('byline')
    , stream = fs.createReadStream(file)
    , stream = byline.createStream(stream)
    ;


var natural = require('natural'),
    TfIdf = natural.TfIdf,
    tfidf = new TfIdf();


stream.on('data', function(line) {

    try{
        var data = JSON.parse(line);
        //console.log(data.interaction.content);

        if(data.interaction.content)
            tfidf.addDocument(data.interaction.content);


    } catch (e) {
        console.log('ERROR: ' + e);
        return;
    }

});



stream.on('end', function() {

    // Debug
    //console.log(JSON.stringify(tfidf));

    tfidf.listTerms(0 /*document index*/).forEach(function(item) {
        console.log(item.term + ': ' + item.tfidf);
    });
});