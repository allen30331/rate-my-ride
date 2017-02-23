
function replaceSignUp() {
  $('.sign-up-title').html('Thanks for signing up');
  $('.sign-up-box').html('<p>Please click below to log in</p>'+
                          '<a href="./log-in.html"><p>log in</p></a>');
}


function addUser(username, password, callback) {
  $.ajax({
    url: '/users',  //http://localhost:8080
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify(
      {
        username: username,
        password: password
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
  let username = $('form').find('#username').val();
  let password = $('form').find('#password').val();
  console.log(username, "hello");
  addUser(username,password,replaceSignUp);
  return false;
});



