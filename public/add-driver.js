//Creates global variable to be used in thank you message in 
//replaceAddDriverHeading function/////
let driverName;

/////Creates global variable so it can be used in the url of the Ajax request/////
let driverTagNumber;

let driverId;



/////Creates Ajax request to create driver begin/////
function createDriver(driverName, company, tagNumber, city, driverRating, description, comment, callback) {
  $.ajax({
    url: '/drivers',  //http://localhost:8080
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify(
     {
        driverName: driverName,
        company: company,
        tagNumber: tagNumber,
        city: city,
        reviews: [
          {
            driverRating: driverRating,
            description: description,
            comment: comment
          }
        ]
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
/////Creates Ajax request to create driver end/////



/////Gets driver bby the drivers tag number/////
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
    }
  },

  error: function(error) {
    console.log(error);
    callbackFn(error);  
    }
  });
}
/////Gets driver by the drivers tag number end/////



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




/////Renders data from Ajax request to get driver by tag number begin/////
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
  $('.submit-driver-review-button').hide();
  $('.review-driver-button').show();  
  $('.add-driver-container').remove();
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
/////Renders data from Ajax request to get driver by tag number end/////




/////Replaces the Add Driver heading with thank you message begin/////
function replaceAddDriverHeading() {
  $('.add-driver-container').remove();
  $('.main .col-12 p').html(`Thanks for adding ${driverName}!`);
}
/////Replaces the Add Driver heading with thank you message end/////




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





/////Event listener for search driver form begin/////
$(".search-driver").submit(function(event) {
  event.preventDefault();
  driverTagNumber = $('.search-driver').find('#tagNumber').val().toUpperCase().replace(/\s+/g, '');
  getDriver(driverTagNumber, renderData);
  $('form').find('#tagNumber').val("");
});
/////Event listener for search driver form end/////






/////Event listener for submit button for add driver form begin/////
$(".add-driver").submit(function(event) {
  event.preventDefault();
  driverName = $('.add-driver').find('#driver-name').val();
  let company = $('.add-driver').find('#company').val();
  let tagNumber = $('.add-driver').find('#tagNumber').val();
  let city = $('.add-driver').find('#city').val();
  let stringDriverRating = $('.add-driver').find('#driverRating').val();
  let driverRating = parseInt(stringDriverRating);
  let description = $('.add-driver').find('#description').val();
  let comment = $('.add-driver').find('#comment').val();
  //console.log(driverName, company, tagNumber, city, driverRating, description, comment, "hello");
  createDriver(driverName, company, tagNumber, city, driverRating, description, comment, replaceAddDriverHeading);
});
/////Event listener for submit button for add driver form end/////





/////Event listener for when review driver button is clicked begin/////
/////It creates the review form/////
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





/////Event listener for submit driver review button begin//////
$(".submit-driver-review-button").click(function(event) {
  event.preventDefault();
  let driverRating = $('#review-form').find('#driverRating').val();
  let description = $('#review-form').find('#description').val();
  let comment = $('#review-form').find('#comment').val();
  createReview(driverRating, description, comment, replaceReviewForm);
});
/////Event listener for submit driver review button end//////






