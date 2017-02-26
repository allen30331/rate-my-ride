
function replaceAddDriver() {
  $('.add-driver-container').html('Thanks for adding the driver');
}


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



$("form").submit(function(event) {
  event.preventDefault();
  let driverName = $('form').find('#driver-name').val();
  let company = $('form').find('#company').val();
  let tagNumber = $('form').find('#tagNumber').val();
  let city = $('form').find('#city').val();
  let stringDriverRating = $('form').find('#driverRating').val();
  let driverRating = parseInt(stringDriverRating);
  let description = $('form').find('#description').val();
  let comment = $('form').find('#comment').val();
  console.log(driverName, company, tagNumber, city, driverRating, description, comment, "hello");
  createDriver(driverName, company, tagNumber, city, driverRating, description, comment, replaceAddDriver);
});