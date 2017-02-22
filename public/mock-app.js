
    // "id": "58a516cd66f88623fcea9adb",
    // "driverName": "Brenda",
    // "company": "Lyft",
    // "tagNumber": "FAS456",
    // "city": "Atlanta",
    // "averageDriverRating": 3,
    // "descriptionSummary": {
    //     "Nice": 1
    //     "Good": 2
    //     },
    // "reviews": [
    //   {
    //     "driverRating": 3,
    //     "description": "Nice",
    //     "comment": "it was awesome",
    //     "_id": "58a516cd66f88623fcea9adc",
    //     "created": "2017-02-16T03:04:45.996Z"
    // },
    // {
    //     "driverRating": 4,
    //     "description": "Nice",
    //     "comment": "it was great",
    //     "_id": "58a516cd66f88623fcea9adc",
    //     "created": "2017-02-16T03:04:45.996Z"
    // }
 
    // ]













// var MOCK_DRIVER_DATA = [

//             {
//             "driverName": "Jon",
//             "company": "Lyft",
//             "tagNumber": "RWQ 123",
//             "city": "Atlanta",
//             "averageDriverRating": 5,
//             "driverRatings": [5,5,5],
//             "reviews": ["Great ride good driver", "Awesome driver", "Comfortable ride"]   
//             }


// ]


// var MOCK_DRIVER_DATA =  

//     {
       
//        "id": {
//             "driverName": "Jon",
//             "company": "Lyft",
//             "tagNumber": "RWQ 123",
//             "city": "Atlanta",
//             "driverRating": 4,
//             "tags": {
//                 "NICE": 2, 
//                 "CREEPY": 1
//             },
//             "reviews": [
//               {
//                 "rating": 5,
//                 "tags": "Nice",
//                 "review": "Good ride. Great driver, very outgoing."
//               },
//               {
//                 "rating": 5,
//                 "tags": "Nice",
//                 "review": "Good ride. Great driver, very outgoing."
//               },
//               {
//                 "rating": 2,
//                 "tags": "Creepy",
//                 "review": "He was really creepy. Don't ride if you're a girl."
//               }
//             ]
//         },
    
// };

// this function's name and argument can stay the
// same after we have a live API, but its internal
// implementation will change. Instead of using a
// timeout function that returns mock data, it will
// use jQuery's AJAX functionality to make a call
// to the server and then run the callbackFn
// function getDriverReview(callbackFn) {
//     // we use a `setTimeout` to make this asynchronous
//     // as it would be with a real AJAX call.
//     setTimeout(function(){ callbackFn(MOCK_DRIVER_DATA)}, 1);
// }

// // this function stays the same when we connect
// // to real API later
// function displayDriverReview(data) {

    



//     for (var index in data) {
//        $('.test-1').append(
//         '<p>' + 'Name: '+ data[index].driverName + '</p>'+
//         '<p>' + 'Company: ' + data[index].company + '</p>'+
//         '<p>' + 'Tag Number: ' + data[index].tagNumber+ '</p>'+
//         '<p>' + 'City: ' + data[index].city + '</p>'+
//         '<p>' + 'Rating: ' + data[index].driverRating + '</p>'+
//         '<p>' + 'How Riders Describe The Driver' + '</p>');
//     }

//     for (var key in data) {
//         for (var key2 in data[key].tags) {
//          $('.test-2').append(
//             '<p>' + key2 + " " + data[key].tags[key2] + '</p>'+
//             '<p>' + 'Rider Reviews' + '</p>');
//         }
//     }
    
//     for (var getDriver in data) {
//         for( var getReview in data[getDriver].reviews) {
//             $('.test-3').append(
//                 '<p>' + 'Rating ' + data[getDriver].reviews[getReview].rating + '</p>'+
//                 '<p>' + 'The Driver Was: ' + data[getDriver].reviews[getReview].tags + '</p>'+
//                 '<p>' + 'Comments: ' + data[getDriver].reviews[getReview].review + '</p>');
//   }
// }
//     // data[getDriver].reviews[getReview].rating + " " + " " + data[getDriver].reviews[getReview].tags + " " + data[getDriver].reviews[getReview].review
// }

// // this function can stay the same even when we
// // are connecting to real API
// function getAndDisplayDriverReview() {
//     getDriverReview(displayDriverReview);
// }

// //  on page load do this
// (function() {
//     getAndDisplayDriverReview();
// })();




// $("p").click(function() {
//     // event.preventDefault();
//     alert('hello');
//   });


        