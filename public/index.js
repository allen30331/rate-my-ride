
function renderData(data) {
  $('.about').remove();
  $('.main p').remove();
  $('.main .col-12').append(
          `<h2>${data.driverName}</h2>`+
          `<p>${data.company}</p>`+
          `<p>tag number: ${data.tagNumber}</p>`+
          `<p>city: ${data.city}</p>`+
          `<p>rating: ${data.averageDriverRating}</p>`);
  
  for (key in data.descriptionSummary) {
    $('main .col-12').append(
          `<p>${key}:</p>`);
  }
  console.log(data.descriptionSummary);
  // $('.slogan').html(data.driverName);
}


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
      let errorString = error.responseText.split(':')[1];
      let errorStringEdit = errorString.substring(1).slice(0, errorString.length -3)
      alert(errorStringEdit);
    }
});
}

let driverTagNumber;

$("form").submit(function(event) {
  event.preventDefault();
  let driverTagNumber = $('form').find('#tag-number').val().toUpperCase().replace(/\s+/g, '');
  getDriver(driverTagNumber, renderData);
  $('form').find('#tag-number').val("");
  //return false;
});



