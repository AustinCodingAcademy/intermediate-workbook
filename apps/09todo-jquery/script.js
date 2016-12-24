'use strict';

$(document).ready(function() {
  // App logic goes here

  $('form').submit(function (event) {
      event.preventDefault();
      var todoText = $(this).find('input[id="todo"]').val();
      $('#todo-list').append('<li><input type="checkbox">' + todoText + '</li>');
    });

  $('#todo-list').sortable();

$('[checked]').css('text-decoration', 'line-through');

});
