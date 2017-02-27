/////Gets driver by the drivers tag number begin/////

let driverId;
let driverName;

function getDriver(driverTagNumber, callbackFn) {
  $.ajax({
    url: `/drivers/${driverTagNumber}/tagNumber`,  //http://localhost:8080
    type: 'GET',
    dataType: 'json',

  success: function(data) {
    if(data) {
      console.log(data);
      driverId = data.id;
      driverName = data.driverName;
      callbackFn(data);
      //console.log(driverId, 'hello hello hello');
    }
  },

  error: function(error) {
    console.log(error);
    callbackFn(error);  
    }
  });
}
/////Gets driver by the drivers tag number end/////


/////Creates global variable so it can be used in the url of the Ajax request/////
let driverTagNumber;




/////Renders data from Ajax request begin/////
function renderData(data) {
  
  //console.log(data.id, 'hello world');

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
  $('.review-driver-button').show();
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
/////Renders data from Ajax request end/////


/////Event listener for search driver form begin/////
$("form").submit(function(event) {
  event.preventDefault();
  driverTagNumber = $('form').find('#tagNumber').val().toUpperCase().replace(/\s+/g, '');
  getDriver(driverTagNumber, renderData);
  $('form').find('#tagNumber').val("");
});
/////Event listener for search driver form end/////





/////Creates Ajax request to create review begin/////
function createReview(driverRating, description, comment, callback) {
  $.ajax({
    url: `/drivers/${driverId}/reviews`,  //http://localhost:8080
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify(
     {
        
        driverRating: driverRating,
        description: description,
        comment: comment
         
      }
    ),

  
   success: function(data) {
      console.log(data);
      callback();
  },
   error: function(error) {
      let errorString = error.responseText.split(':')[1];
      let errorStringEdit = errorString.substring(1).slice(0, errorString.length -3)
      alert(errorStringEdit);
    }
});
}
/////Creates Ajax request to create review end/////


/////Replaces review form with thank you message begin/////
function replaceReviewForm() {
  $('.review-driver-button').remove();
  $('.review-driver-container').remove();
  $('.submit-driver-review-button').remove();
  $('.main .row').append(
      `<div class="col-12">
        <p class="slogan">Thanks for reviewing ${driverName}!</p>
      </div>`
    )
}
/////Replaces review form with thank you message end/////


/////Event listener for when review driver button is clicked begin/////
$(".review-driver-button").click(function(event) {
  event.preventDefault();
  //alert('hello');
  $('.main .col-12').remove();
  $('.review-driver-container').show();
  $('.review-driver-container').append(
      `<div class="col-12">
          <form class="review-driver" action="/drivers/id/reviews" method="post" id="review-form">
            Rating: <select name="rating" form="rating-choice" id="driverRating">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    </select><br>
            Description: <select name="description" form="description-choice" id="description">
                    <option value="Great">Great</option>
                    <option value="Good">Good</option>
                    <option value="Bad">Bad</option>
                    <option value="Nuetral">Nuetral</option>
                    <option value="Creepy">Creepy</option>
                    </select><br>

             Comment: <textarea cols="50" rows="4" name="comment" id="comment" required></textarea><br>
          </form>
      </div>`);
  $('.submit-driver-review-button').show();
});
/////Event listener for when review driver button is clicked end/////



$(".submit-driver-review-button").click(function(event) {
  event.preventDefault();
  let driverRating = $('#review-form').find('#driverRating').val();
  let description = $('#review-form').find('#description').val();
  let comment = $('#review-form').find('#comment').val();
  createReview(driverRating, description, comment, replaceReviewForm);
});



