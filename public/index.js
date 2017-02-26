//Gets driver by the drivers tag number
function getDriver(driverTagNumber, callbackFn) {
  $.ajax({
    url: `/drivers/${driverTagNumber}/tagNumber`,  //http://localhost:8080
    type: 'GET',
    dataType: 'json',

  success: function(data) {
    if(data) {
      console.log(data);
      callbackFn(data);
    }
  },

  error: function(error) {
    console.log(error);
    callbackFn(error);  
    }
  });
}


let driverTagNumber;




//Renders data from Ajax request
function renderData(data) {
  
  console.log(data.id);

  if (data.status === 500) {
    $('.about').remove();
    $('.main .col-12').remove();
    $('main .row').append(
          `<div class="col-12 no-driver-found">
            <p>We don't have that driver yet,<br>
            but you can add them now!
            </p>
            <div class="add-driver-container">
              <button class="add-driver"><a href="./add-driver">Add Driver</a></button>
            </div>
          </div>`);
  }
  else {
  $('.about').remove();
  $('.main .col-12').remove();
  $('.main .row').append(
          `<div class="col-12"><h2 class="driver">${data.driverName}</h2>`+
          `<p>${data.company}</p>`+
          `<p>tag number: ${data.tagNumber}</p>`+
          `<p>city: ${data.city}</p>`+
          `<p>rating: ${data.averageDriverRating}</p>`+
          `<p class="driver-description">Tags for this driver</p></div>`);
  
  for (key in data.descriptionSummary) {
    $('main .col-12').append(
          `<p>${key}: ${data.descriptionSummary[key]}</p>`);
  }

  $('.main .col-12').append(`<p class="reviews">Reviews</p>`)

  data.reviews.forEach(function (review) {
    $('.main .col-12').append(
          `<p>rating: ${review.driverRating}</p>`+
          `<p>description: ${review.description}</p>`+
          `<p>comment: ${review.comment}</p>`+
          `<p>created: ${review.created}</p>`+
          `<div class="border"></div>`);
  });
  
  
  }
}






$("form").submit(function(event) {
  event.preventDefault();
  driverTagNumber = $('form').find('#tagNumber').val().toUpperCase().replace(/\s+/g, '');
  getDriver(driverTagNumber, renderData);
  $('form').find('#tag-number').val("");
});

// $('.main .row').on('click', function() {
//   $('.main .col-12').remove();
//   $('.main .row').append(
//     `<div col-12>
//       <form class="add-driver" action="/drivers" method="post">
//         Driver's Name:<input type="text" name="driver-name" id="driver-name" placeholder="enter driver's name" required><br>
//         Company:<select name="companies" form="company-choice">
//               <option value="Uber">Uber</option>
//               <option value="Lyft">Lyft</option>
//             </select><br>
//         Tag Number: <input type="text" name="tag-number" id="tag-number" placeholder="enter driver's tag number" required><br>
//         City: <input type="text" name="city" id="city" placeholder="enter your city" required><br>
//         Rating: <select name="rating" form="rating-choice">
//                 <option value="1">1</option>
//                 <option value="2">2</option>
//                 <option value="3">3</option>
//                 <option value="4">4</option>
//                 <option value="5">5</option>
//                 </select><br>
//         Description: <select name="description" form="description-choice">
//                 <option value="Great">Great</option>
//                 <option value="Good">Good</option>
//                 <option value="Bad">Bad</option>
//                 <option value="Nuetral">Nuetral</option>
//                 <option value="Creepy">Creepy</option>
//                 </select><br>

//          Comment: <textarea cols="50" rows="4" name="comment" required=""></textarea>
//          <button type="submit" class="submit-driver-button">submit</button>
//       </form>
//     </div>`
//     )
// })

