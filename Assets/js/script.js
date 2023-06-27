// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {

  var dayListEl = $('#dayListContainer');
  //Function that saves text entered by user to local storage when user clicks on save button.
  function handleSaveAppointment(event) {
    //Getting event target
    var btnClicked = $(event.target)
    //Getting the closest parent of event target that has a class of time-block.
    //Closest is used to allow the rest of the code to work properly if the user clicks on the image inside the button.
    var btnParentEl = btnClicked.closest('.time-block')
    //Getting the ID of the time-block element
    var btnParentId = btnParentEl.attr('id')
    // Getting the child element of the time-block element that has a class of description
    var eventTextEl = btnParentEl.children('.description')
    // Saving the value of the description element
    var textToSave = eventTextEl.val()
    //Making sure the value isnt empty because it has a default value of " "
    if (textToSave != " ") {
      //Saving the ID as the key and text value as the value
      localStorage.setItem(btnParentId, textToSave)
      // Creating a text element that will pop up for 3 seconds upon saving to alert user that the appointment has been saved
      var savedEl = $('<p>')
      savedEl.text('Appointment saved to local storage')
      savedEl.css('text-align', 'center')
      dayListEl.prepend(savedEl)
      setTimeout(function () {
        savedEl.remove()
      }, 3000)
    }

  }
  //Event listener that is looking for clicks on the dayListEl element and its child elements that have the class saveBtn and runs the handleSaveAppointment function
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
    //Looping through all the hourly time blocks and checking if there is any locally saved appointments for them.
    for (var i = 9; i < 18; i++) {
      //assigning a variable to the time block element with the class hour-'i' 
      var hourEl = $('#hour-' + i);
      // assigning a variable to the child element with the class description
      var textAreaEl = hourEl.children('.description')
      // getting the locally saved value of the item that has a key of hour-'i'
      var savedEvent = localStorage.getItem('hour-' + i)
      // Checking if there was anything saved
      if (savedEvent) {
        // Applying the locally saved value to the current hour block text area
        textAreaEl.text(savedEvent)
      }



    }
  }
  readSavedAppoinments()

  //code to display the current date in the header of the page.
  var today = dayjs().format('dddd, MMMM D, YYYY');
  $('#currentDay').text(today);
});
