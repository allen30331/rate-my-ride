/////Replaces the Add Driver heading with thank you message begin/////
function replaceAddDriverHeading() {
  $('.add-driver-container').remove();
  $('.main .col-12 p').html(`Thanks for adding ${driverName}!`);
}
/////Replaces the Add Driver heading with thank you message end/////


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


//Creates global variable to be used in thank you message in 
//replaceAddDriverHeading function/////
let driverName;


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



/////This section is for the search bar request to get a driver/////
/////and display their information/////

/////Gets driver by the drivers tag number begin/////
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
/////Gets driver by the drivers tag number end/////


/////Creates global variable so it can be used in the url of the Ajax request/////
let driverTagNumber;




/////Renders data from Ajax request begin/////
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
/////Renders data from Ajax request end/////


/////Event listener for search driver form begin/////
$(".search-driver").submit(function(event) {
  event.preventDefault();
  driverTagNumber = $('.search-driver').find('#tagNumber').val().toUpperCase().replace(/\s+/g, '');
  getDriver(driverTagNumber, renderData);
  $('form').find('#tagNumber').val("");
});
/////Event listener for search driver form end/////