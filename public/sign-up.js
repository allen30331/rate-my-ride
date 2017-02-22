function addUser(username, password) {
  $.ajax({
    url: 'http://localhost:8080/users',
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
  }
});
}



$("form").submit(function(event) {
  event.preventDefault();
  let username = $('form').find('#username').val();
  let password = $('form').find('#password').val();
  console.log(username, "hello");
  addUser(username,password);
});



