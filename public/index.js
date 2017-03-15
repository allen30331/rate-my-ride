/////Creates variable so it can be used in the url of the Ajax request/////
let driverId;

//Creates variable to be used in thank you message in 
//replaceAddDriverHeading function/////
let driverName;

/////Creates  variable so it can be used in the url of the Ajax request/////
let driverTagNumber;


/////Creates variable so it can be used in the url of the Ajax request/////
let reviewId; 

let demoTagNumber;

/////Gets driver bby the drivers tag number/////
function getDriver(driverTagNumber, callbackFn) {
  $.ajax({
    url: `/drivers/${driverTagNumber}/tagNumber`,  //http://localhost:8080
    type: 'GET',
    dataType: 'json',

  success: function(data) {
    if(data) {
      driverId = data.id;
      driverName = data.driverName;
      callbackFn(data);
    }
  },

  error: function(error) {
    console.log(error);
    callbackFn(error);  
    }
  });
}
/////Gets driver by the drivers tag number end/////


/////Gets demo driver by the drivers tag number/////
function getDemoDriver(demoTagNumber, callbackFn) {
  console.log(demoTagNumber);
  $.ajax({
    url: `/drivers/${demoTagNumber}/tagNumber`,  //http://localhost:8080
    type: 'GET',
    dataType: 'json',

  success: function(data) {
    if(data) {
      driverId = data.id;
      driverName = data.driverName;
      callbackFn(data);
    }
  },

  error: function(error) {
    console.log(error);
    callbackFn(error);  
    }
  });
}
/////Gets demo driver by the drivers tag number end/////



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



/////Creates Ajax request to delete review begin/////
function deleteReview(reviewId, callback) {
  $.ajax({
    url: `/drivers/${reviewId}/review`, 
    type: 'DELETE',
    dataType: 'json',
    


   success: function() {
  
  },
   error: function(error) {
      let errorString = error.responseText.split(':')[1];
      let errorStringEdit = errorString.substring(1).slice(0, errorString.length -3)
      alert(errorStringEdit);
    }
});
}
/////Creates Ajax request to delete review end/////






/////Renders data from Ajax request to get driver by tag number begin/////
function renderData(data) {



  let now = new Date();
  
  let day = now.getDate();

  let month = now.getMonth();

  let year = now.getFullYear();
  
  if (data.status === 500) {
    $('.submit-driver-review-button').hide();
    $('.about').remove();
    $('.main .col-12').remove();
    $('.review-driver-button').hide();
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
  $('.submit-driver-review-button').hide();
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
          `<p>created: ${month}/${day}/${year}</p>`+
          // `<button class="delete-button" id="${review._id}">delete</button>`+
          `<div class="border"></div>`);
  });
  
  
  }
}
/////Renders data from Ajax request to get driver by tag number end/////



/////Replaces review form with thank you message begin/////
function replaceReviewForm() {
  $('.review-driver-button').hide();
  $('.review-driver-container').hide();
  $('.submit-driver-review-button').hide();
  $('.main .row').append(
      `<div class="col-12">
        <p class="slogan">Thanks for reviewing ${driverName}!</p>
      </div>`
    )
}
/////Replaces review form with thank you message end/////



/////Event listener for when review driver button is clicked begin/////
/////It creates the review form/////
$(".review-driver-button").click(function(event) {
  event.preventDefault();
  $('.main .col-12').remove();
  $('.review-driver-container').show();
  $('.review-driver-container').append(
      `<div class="col-12">
          <form class="review-driver" action="/drivers/id/reviews" method="post" id="review-form">
            <p>Rating:</p> <select name="rating" form="rating-choice" id="driverRating">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    </select><br>
            <p>Description:</p> <select name="description" form="description-choice" id="description">
                    <option value="Great">Great</option>
                    <option value="Good">Good</option>
                    <option value="Bad">Bad</option>
                    <option value="Nuetral">Nuetral</option>
                    <option value="Creepy">Creepy</option>
                    </select><br>

             <p>Comment:</p> <textarea cols="50" rows="4" name="comment" id="comment" required></textarea><br>
          </form>
      </div>`);
  $('.submit-driver-review-button').show();
});
/////Event listener for when review driver button is clicked end/////




/////Event listener for search driver form begin/////
$("form").submit(function(event) {
  event.preventDefault();
  driverTagNumber = $('form').find('#tagNumber').val().toUpperCase().replace(/\s+/g, '');
  getDriver(driverTagNumber, renderData);
  $('form').find('#tagNumber').val("");
});
/////Event listener for search driver form end/////




/////Event listener for search driver form middle of page begin/////
$(".search-driver-middle").submit(function(event) {
  event.preventDefault();
  driverTagNumber = $(".search-driver-middle").find('#tagNumberMiddle').val().toUpperCase().replace(/\s+/g, '');
  console.log(driverTagNumber, "hello");
  getDriver(driverTagNumber, renderData);
  $('.search-driver').show();
  $('.demo').show();
});
/////Event listener for search driver form middle of page end/////







/////Event listener for demo driver form begin/////
$(".demo").click(function(event) {
  console.log(event);
  event.preventDefault();
  demoTagNumber = 'ABC123';
  getDemoDriver(demoTagNumber, renderData);
});
/////Event listener for demo driver form end/////




/////Event listener for demo driver form  middle begin/////
$(".demo-middle").click(function(event) {
  console.log(event);
  event.preventDefault();
  demoTagNumber = 'ABC123';
  getDemoDriver(demoTagNumber, renderData);
  $('.search-driver').show();
  $('.demo').show();
  

});
/////Event listener for demo driver form middle end/////




/////Event listener for submit driver review button begin//////
$(".submit-driver-review-button").click(function(event) {
  event.preventDefault();
  let driverRating = $('#review-form').find('#driverRating').val();
  let description = $('#review-form').find('#description').val();
  let comment = $('#review-form').find('#comment').val();
  createReview(driverRating, description, comment, replaceReviewForm);
});
/////Event listener for submit driver review button end//////



/////Event listener for delete review button begin//////
$(".main .row").on('click', '.delete-button', function(event) {
  //console.log(event);
  reviewId = event.currentTarget.id;
  deleteReview(reviewId);
  $('.main .col-12').hide();
  $('.review-driver-button').hide();
  $('.main .row').append(
    `<div class="col-12">
      <p class="slogan">Review was deleted</p>
    </div>`
    )
});
/////Event listener for delete review button end//////












