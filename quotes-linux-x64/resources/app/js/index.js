let request = require('request');
const remote = require('electron').remote;
const {shell} = require('electron')



generateQuote();

setInterval(generateQuote,8000);

function generateQuote(){
    $("#bounds").hide()
    $(document).ready(function () {
        $("#bounds").delay(800).fadeIn(1000); 
    });

    request("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",
        function(err, response, body){
            var quote = "";
            var author = "";
            var source = "";
            
            let bodyJson = JSON.parse(body);
            quote = bodyJson[0]["content"];
            author = bodyJson[0]["title"];
            source = bodyJson[0]["link"];
            
            if(quote.length>=284){
                console.log("if")
                generateQuote();
            }
            author = "–"+author;
            quote = quote.replace("<p>", "\"");
            quote = quote.replace("</p>", "\"")
            
            document.getElementById("quote").innerHTML = quote;
            document.getElementById("author").innerHTML = author;
            
            document.getElementById("refresh").addEventListener("click", function (e) {
                let window = remote.getCurrentWindow();
                window.reload();
            });
            
            document.getElementById("quit").addEventListener("click", function (e) {
                let window = remote.getCurrentWindow();
                window.close();
            });
            // var sourceButton = document.getElementById("link");
            // sourceButton.href = source;

            $("#source").one( "click", function() { shell.openExternal(source); } );

            // document.getElementById("source").addEventListener("click", function (e) {
            // // window.open(source);
            // console.log(source)
            // shell.openExternal('https://github.com')
            // });

            
                  
});

}



            
       
            
            
            
       