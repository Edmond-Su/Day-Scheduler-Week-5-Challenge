// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  var dayListEl = $('#dayListContainer');

  function handleSaveAppointment(event) {
    console.log("CLICK")
    var btnClicked = $(event.target)
    // console.log(btnClicked)
    var btnParentEl = btnClicked.closest('div')
    var btnParentId = btnParentEl.attr('id')
    // console.log(btnParentEl)
    // // console.log(btnParentId)
    var eventTextEl = btnParentEl.children('.description')
    // console.log(eventTextEl)
    var textToSave = eventTextEl.val()
    // console.log(textToSave)
    if (textToSave != " ") {
      localStorage.setItem(btnParentId, textToSave)
      var savedEl = $('<p>')
      savedEl.text('Appointment saved to local storage')
      savedEl.css('text-align', 'center')
      dayListEl.prepend(savedEl)
      setTimeout(function () {
        savedEl.remove()
      }, 3000)
    }

  }

  dayListEl.on('click', '.saveBtn', handleSaveAppointment)

  // Getting current hour and saving it to a variable.
  var currentTime = dayjs().format('HH');
  // Looping through all the hourly time blocks and applying a class to them.
  for (var i = 9; i < 18; i++) {
    //assigning a variable to the time block element with the class hour-'i' 
    var hourEl = $('#hour-' + i);
    // Checking if the current hour is less than, greater than or equal to the current hour and applying a class depending which it is.
    if (i < currentTime) {
      hourEl.addClass('past');
    } else if (i > currentTime) {
      hourEl.addClass('future');
    } else {
      hourEl.addClass('present');
    };
  };

  //Function that checks local storage for saved appointments
  function readSavedAppoinments() {
    for (var i = 9; i < 18; i++) {
      var hourEl = $('#hour-' + i);
      var textAreaEl = hourEl.children('.description')
      var savedEvent = localStorage.getItem('hour-' + i)
      if (savedEvent) {
        console.log(savedEvent)
        textAreaEl.text(savedEvent)
      }



    }
  }
  readSavedAppoinments()

  //code to display the current date in the header of the page.
  var today = dayjs().format('dddd, MMMM D, YYYY');
  $('#currentDay').text(today);
});
