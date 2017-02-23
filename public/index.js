
// function replaceSignUp() {
//   $('.sign-up-title').html('Thanks for signing up');
// }


function getDriver(driverTagNumber) {
  $.ajax({
    url: `/drivers/${driverTagNumber}/tagNumber`,  //http://localhost:8080
    type: 'GET',
    dataType: 'json',

   success: function(data) {
      if(data) {
        console.log(data);
        //callbackFn(results);
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
  getDriver(driverTagNumber);
  $('form').find('#tag-number').val("");
  //return false;
});



