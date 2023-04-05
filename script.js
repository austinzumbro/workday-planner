function retrieveText(key) {
  let response = localStorage.getItem(key);
  if (response) {
    return response;
  } else {
    return "";
  }
}

$(function () {
  // Grab elements in the HTML doc
  const mainSection = $("#main-section");
  const currentDayP = $("#currentDay");

  // Declare time variables
  let currentDay = dayjs();
  let currentHour = currentDay.hour();
  let currentDayInt = currentDay.date();
  // Format the current day
  let dayText = currentDay.format("dddd, MMMM D");
  if (currentDayInt == 1 || currentDayInt == 21 || currentDayInt == 31) {
    dayText += "st";
  } else if (currentDayInt == 2 || currentDayInt == 22) {
    dayText += "nd";
  } else if (currentDayInt == 3 || currentDayInt == 23) {
    dayText += "rd";
  } else {
    dayText += "th";
  }
  // Append that text to the relevant HTML element
  currentDayP.text(dayText);

  // Declare variables relevant to the construction of the scheduler
  let workdayStart = 9;
  let workdayEnd = 18;

  // Construct the scheduler
  for (let i = workdayStart; i < workdayEnd; i++) {
    let time = dayjs().hour(i).format("hA");

    // Construct the parent "hour" row
    let divRow = $("<div>", {
      id: "hour-" + i,
      class: "row time-block",
    });
    // Apply classes based on current time
    if (currentHour > i) {
      divRow.addClass("past");
    } else if (currentHour == i) {
      divRow.addClass("present");
    } else {
      divRow.addClass("future");
    }

    // Construct the child column displaying the hour
    let timeCol = $("<div>", {
      class: "col-2 col-md-1 hour text-center py-3",
    });
    timeCol.text(time);

    // Construct the text column
    let textCol = $("<textarea>", {
      class: "col-8 col-md-10 description",
      rows: "3",
    });

    // Retrieve any stored text from localStorage and fill the textarea
    let storedText = retrieveText("hour-" + i);
    textCol[0].value = storedText;
    // textCol.text(storedText);
    // ^^^^^^^^^^^^^^^^^^^^^^^
    // The code above was how I initally filled the field.
    // However, because we use to use the "value" property to retrieve
    // a textarea's contents, it seemed like a good idea to use the same
    // method to fill the textarea on page load. However, switching
    // between the two doesn't seem to reveal any practical difference.

    // Construct the button column
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

    // Append all the columns to the row
    divRow.append(timeCol);
    divRow.append(textCol);
    divRow.append(buttonCol);

    // Append the row to the main section tag
    mainSection.append(divRow);
  }

  // On click, get the ID of the parent row and use it to store the
  // relevant textarea contents to localStorage for later use.
  $("button").on("click", function () {
    let parentRow = $(this).parent();
    let rowID = parentRow[0].id;
    let textarea = parentRow.children("textarea");
    let textAreaContent = textarea[0].value;

    localStorage.setItem(rowID, textAreaContent);
  });
});
