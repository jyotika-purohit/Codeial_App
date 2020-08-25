
$.ajax({
    url:'http://newsapi.org/v2/top-headlines?' +
    'country=us&' +
    'apiKey=0e47546fdc5a4e1bbc29a0ab34251404',
    type:'get',
    success:function(data){
        console.log(data);
        for(i=0;i<=5;i++){

            if(i == data.articles.length ){
                break;
            }
                    $('#left-aside').append(
                        `<div id="news-container">    
                            <img src="${data.articles[i].urlToImage}" alt="image">
                            <a href="${data.articles[i].url}"><h3>${data.articles[i].title}</h3></a>
                            <a href="${data.articles[i].url}"><p id="description">${data.articles[i].description}</p></a>
                    </div>`
                    )
                     
        }
    },
    error:function(error){
        console.log(error)
    }
});



// $.ajax({
//     beforeSend: function(xhrObj){
//         xhrObj.setRequestHeader('x-rapidapi-host', 'live-score-api.p.rapidapi.com');
//         xhrObj.setRequestHeader('x-rapidapi-key', 'eb2233324amshe1b24d08f639999p1290f3jsn65d6f0cd0f63');
//         xhrObj.setRequestHeader("useQueryString",true);
//     },
//     type: 'get',
//     processData: false,
//     dataType: "json",
//     url: 'https://live-score-api.p.rapidapi.com/scores/live.json',
//     success:function(data){
//         console.log(data);
//     },
//     error:function(error){
//         console.log("ERROR",error);
//     }
// })



 
