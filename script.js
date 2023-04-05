// {/* <div id="hour-9" class="row time-block past">
//   <div class="col-2 col-md-1 hour text-center py-3">9AM</div>
//   <textarea class="col-8 col-md-10 description" rows="3">
//   </textarea>
//   <button class="btn saveBtn col-2 col-md-1" aria-label="save">
//     <i class="fas fa-save" aria-hidden="true"></i>
//   </button>
// </div>; */}

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
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
  const mainSection = $("#main-section");
  const currentDayP = $("#currentDay");

  let currentHour = dayjs().hour();
  let currentDay = dayjs();
  let currentDayInt = dayjs().day();
  let dayText = dayjs(currentDay).format("dddd, MMMM d");
  let workdayStart = 9;
  let workdayEnd = 18;

  if (currentDayInt == 1 || currentDayInt == 21 || currentDayInt == 31) {
    dayText += "st";
  } else if (currentDayInt == 2 || currentDayInt == 22) {
    dayText += "nd";
  } else if (currentDayInt == 3 || currentDayInt == 23) {
    dayText += "rd";
  } else {
    dayText += "th";
  }

  currentDayP.text(dayText);
  console.log(currentDayInt);

  function init() {
    for (let i = workdayStart; i < workdayEnd; i++) {
      let time = dayjs().hour(i).format("hA");
      let divRow = $("<div>", {
        id: "hour-" + i,
        class: "row time-block",
      });

      if (currentHour > i) {
        divRow.addClass("past");
      } else if (currentHour == i) {
        divRow.addClass("present");
      } else {
        divRow.addClass("future");
      }

      let timeCol = $("<div>", {
        class: "col-2 col-md-1 hour text-center py-3",
      });
      timeCol.text(time);
      let textCol = $("<textarea>", {
        class: "col-8 col-md-10 description",
        rows: "3",
      });
      let buttonCol = $("<button>", {
        class: "btn saveBtn col-2 col-md-1",
        ariaLabel: "save",
      });
      buttonCol.append(
        $("<i>", {
          class: "fas fa-save",
          ariaHidden: "true",
        })
      );
      divRow.append(timeCol);
      divRow.append(textCol);
      divRow.append(buttonCol);
      mainSection.append(divRow);
    }
  }

  init();
});
