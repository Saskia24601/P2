// - Personnel Table -
// Func to get all data from Personnel db
const getAllPersonnelData = () => {
  $.ajax({
    url: "php/getAll.php",
    type: "POST",
    dataType: "JSON",
    success: function (result) {
      if (result.status.code === "200") {
        // console.log("Sucess - Personnel Data: ", result.data);

        // Call to populate Personnel table
        let allPersonnelData = result.data;
        populatePersonnelTable(allPersonnelData);
      } else {
        // console.log("Error: Could not return data from Personnel Database");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    },
  });
};

// Func to programmatically create Personnel table, with data from db
const populatePersonnelTable = (allPersonnelData) => {
  $("#personnelTableBody").html("");
  let personnelDocFrag = document.createDocumentFragment();

  // For loop through retreived data
  for (let i = 0; i < allPersonnelData.length; i++) {
    let personnelDetails = allPersonnelData[i];

    // Extract id, full name, department, location, email data for each entry
    let personnelId = personnelDetails.id;
    let personnelName = `${personnelDetails.lastName}, ${personnelDetails.firstName}`;
    let personnelDepartment = personnelDetails.department;
    let personnelLocation = personnelDetails.location;
    let personnelEmail = personnelDetails.email;

    // Create new row
    let personnelRow = document.createElement("tr");

    // Create name cell
    let personnelNameCell = document.createElement("td");
    personnelNameCell.classList = "align-middle text-nowrap";

    let personnelNameContent = document.createTextNode(personnelName);
    personnelNameCell.append(personnelNameContent);

    personnelRow.append(personnelNameCell);

    // Create department cell
    let personnelDepartmentCell = document.createElement("td");
    personnelDepartmentCell.classList =
      "align-middle text-nowrap d-none d-md-table-cell";

    let personnelDepartmentContent =
      document.createTextNode(personnelDepartment);
    personnelDepartmentCell.append(personnelDepartmentContent);

    personnelRow.append(personnelDepartmentCell);

    // Create location cell
    let personnelLocationCell = document.createElement("td");
    personnelLocationCell.classList =
      "align-middle text-nowrap d-none d-md-table-cell";

    let personnelLocationContent = document.createTextNode(personnelLocation);
    personnelLocationCell.append(personnelLocationContent);

    personnelRow.append(personnelLocationCell);

    // Create email cell
    let personnelEmailCell = document.createElement("td");
    personnelEmailCell.classList =
      "align-middle text-nowrap d-none d-md-table-cell";

    let personnelEmailContent = document.createTextNode(personnelEmail);
    personnelEmailCell.append(personnelEmailContent);

    personnelRow.append(personnelEmailCell);

    // Create edit/delete cell
    let personnelEditDeleteCell = document.createElement("td");
    personnelEditDeleteCell.classList = "text-end text-nowrap";

    // Create edit btn
    let personnelEditContent = document.createElement("button");
    personnelEditContent.setAttribute("type", "button");
    personnelEditContent.classList = "btn btn-primary btn-sm";
    personnelEditContent.setAttribute("data-bs-toggle", "modal");
    personnelEditContent.setAttribute("data-bs-target", "#editPersonnelModal");
    personnelEditContent.setAttribute("data-id", personnelId);

    // Create edit btn icon
    let personnelEditIcon = document.createElement("i");
    personnelEditIcon.classList = "fa-solid fa-pencil fa-fw";
    personnelEditContent.append(personnelEditIcon);

    // Create delete btn
    let personnelDeleteContent = document.createElement("button");
    personnelDeleteContent.setAttribute("type", "button");
    personnelDeleteContent.classList = "btn btn-primary btn-sm";
    personnelDeleteContent.setAttribute("data-bs-toggle", "modal");
    personnelDeleteContent.setAttribute(
      "data-bs-target",
      "#deletePersonnelModal"
    );
    personnelDeleteContent.setAttribute("data-id", personnelId);

    // Create delete btn icon
    let personnelDeleteIcon = document.createElement("i");
    personnelDeleteIcon.classList = "fa-solid fa-trash fa-fw";
    personnelDeleteContent.append(personnelDeleteIcon);

    personnelEditDeleteCell.append(
      personnelEditContent,
      " ",
      personnelDeleteContent
    ); // Append edit & delete btns to edit/delete cell

    personnelRow.append(personnelEditDeleteCell);

    // Append row to doc fragment
    personnelDocFrag.append(personnelRow);
  }

  // Append doc fragment (all created rows) to table body
  $("#personnelTableBody").append(personnelDocFrag);
};

// - Departments Table -
// Func to get all data from Department db
const getAllDepartmentsData = () => {
  $.ajax({
    url: "php/getAllDepartments.php",
    type: "POST",
    dataType: "JSON",
    success: function (result) {
      if (result.status.code === "200") {
        // console.log("Sucess - Departments Data: ", result.data);

        // Call to populate Departments table
        let allDepartmentsData = result.data;
        populateDepartmentsTable(allDepartmentsData);
      } else {
        // console.log("Error: Could not return data from Departments Database");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    },
  });
};

// Func to programmatically create Departments table, with data from db
const populateDepartmentsTable = (allDepartmentsData) => {
  $("#departmentTableBody").html(""); // Clear any previous entries
  let departmentsDocFrag = document.createDocumentFragment(); // Create doc fragment

  // For loop through retreived data
  for (let i = 0; i < allDepartmentsData.length; i++) {
    let departmentDetails = allDepartmentsData[i];

    // Extract id, department name & location for each entry
    let departmentId = departmentDetails.id;
    let departmentName = departmentDetails.name;
    let departmentLocation = departmentDetails.location;

    // Create new department row
    let departmentRow = document.createElement("tr");

    // Create department name cell
    let departmentNameCell = document.createElement("td");
    departmentNameCell.classList = "align-middle text-nowrap";

    let departmentNameContent = document.createTextNode(departmentName);
    departmentNameCell.append(departmentNameContent);

    departmentRow.append(departmentNameCell);

    // Create department location cell
    let departmentLocationCell = document.createElement("td");
    departmentLocationCell.classList =
      "align-middle text-nowrap d-none d-md-table-cell";

    let departmentLocationContent = document.createTextNode(departmentLocation);
    departmentLocationCell.append(departmentLocationContent);

    departmentRow.append(departmentLocationCell);

    // Create department edit/delete cell
    let departmentEditDeleteCell = document.createElement("td");
    departmentEditDeleteCell.classList = "text-end text-nowrap";

    // Create department edit btn
    let departmentEditContent = document.createElement("button");
    departmentEditContent.setAttribute("type", "button");
    departmentEditContent.classList = "btn btn-primary btn-sm";
    departmentEditContent.setAttribute("data-bs-toggle", "modal");
    departmentEditContent.setAttribute(
      "data-bs-target",
      "#editDepartmentModal"
    );
    departmentEditContent.setAttribute("data-id", departmentId);

    // Create edit btn icon
    let departmentEditIcon = document.createElement("i");
    departmentEditIcon.classList = "fa-solid fa-pencil fa-fw";
    departmentEditContent.append(departmentEditIcon);

    // Create delete btn
    let departmentDeleteContent = document.createElement("button");
    departmentDeleteContent.setAttribute("type", "button");
    departmentDeleteContent.classList = "btn btn-primary btn-sm delDeptBtn";
    // departmentDeleteContent.setAttribute("data-bs-toggle", "modal");
    // departmentDeleteContent.setAttribute("data-bs-target", "#deleteDepartmentModal");
    departmentDeleteContent.setAttribute("data-id", departmentId);

    // Create delete btn icon
    let departmentDeleteIcon = document.createElement("i");
    departmentDeleteIcon.classList = "fa-solid fa-trash fa-fw";
    departmentDeleteContent.append(departmentDeleteIcon);

    departmentEditDeleteCell.append(
      departmentEditContent,
      " ",
      departmentDeleteContent
    ); // Append department edit & delete btns to department edit/delete cell

    departmentRow.append(departmentEditDeleteCell);

    // Append department row to doc fragment
    departmentsDocFrag.append(departmentRow);
  }

  // Append doc fragment (all created rows) to table body
  $("#departmentTableBody").append(departmentsDocFrag);
};

// - Locations Table -
// Func to get all data from Location db
const getAllLocationsData = () => {
  $.ajax({
    url: "php/getAllLocations.php",
    type: "POST",
    dataType: "JSON",
    success: function (result) {
      if (result.status.code === "200") {
        // console.log("Sucess - Locations Data: ", result.data);

        // Call to populate Locations table
        let allLocationsData = result.data;
        populateLocationsTable(allLocationsData);
      } else {
        // console.log("Error: Could not return data from Departments Database");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    },
  });
};

// Func to populate Locations table, with data from db
const populateLocationsTable = (allLocationsData) => {
  $("#locationTableBody").html(""); // Clear any previous entries
  let locationsDocFrag = document.createDocumentFragment(); // Create doc fragment

  // For loop through retreived data
  for (let i = 0; i < allLocationsData.length; i++) {
    let locationDetails = allLocationsData[i];

    // Extract id & location name for each entry
    let locationId = locationDetails.id;
    let locationName = locationDetails.name;

    // Create new location row
    let locationRow = document.createElement("tr");

    // Create location name cell
    let locationNameCell = document.createElement("td");
    locationNameCell.classList = "align-middle text-nowrap";

    let locationNameContent = document.createTextNode(locationName);
    locationNameCell.append(locationNameContent);

    locationRow.append(locationNameCell);

    // Create location edit/delete cell
    let locationEditDeleteCell = document.createElement("td");
    locationEditDeleteCell.classList = "text-end text-nowrap";

    // Create location edit btn
    let locationEditContent = document.createElement("button");
    locationEditContent.setAttribute("type", "button");
    locationEditContent.classList = "btn btn-primary btn-sm";
    locationEditContent.setAttribute("data-bs-toggle", "modal");
    locationEditContent.setAttribute("data-bs-target", "#editLocationModal");
    locationEditContent.setAttribute("data-id", locationId);

    // Create edit btn icon
    let locationEditIcon = document.createElement("i");
    locationEditIcon.classList = "fa-solid fa-pencil fa-fw";
    locationEditContent.append(locationEditIcon);

    // Create delete btn
    let locationDeleteContent = document.createElement("button");
    locationDeleteContent.setAttribute("type", "button");
    locationDeleteContent.classList = "btn btn-primary btn-sm delLocBtn";
    // locationDeleteContent.setAttribute("data-bs-toggle", "modal");
    // locationDeleteContent.setAttribute("data-bs-target", "#deleteLocationModal");
    locationDeleteContent.setAttribute("data-id", locationId);

    // Create delete btn icon
    let locationDeleteIcon = document.createElement("i");
    locationDeleteIcon.classList = "fa-solid fa-trash fa-fw";
    locationDeleteContent.append(locationDeleteIcon);

    locationEditDeleteCell.append(
      locationEditContent,
      " ",
      locationDeleteContent
    ); // Append location edit & delete btns to location edit/delete cell

    locationRow.append(locationEditDeleteCell);

    // Append location row to doc fragment
    locationsDocFrag.append(locationRow);
  }

  // Append doc fragment (all created rows) to table body
  $("#locationTableBody").append(locationsDocFrag);
};

// Refresh Icon Animation
const refreshIconAnimation = () => {
  $("#refreshIcon").css({ transform: "rotate(0deg)" });
  $({ deg: 0 }).animate(
    { deg: 360 },
    {
      duration: 750,
      step: function (now) {
        $("#refreshIcon").css({
          transform: "rotate(" + now + "deg)",
        });
      },
    }
  );
};

// Preloader Animation
$(window).on("load", function () {
  if ($("#preloader").length) {
    $("#preloader")
      .delay(500)
      .fadeOut("slow", function () {
        $(this).remove();
      });
  }
});

// Once DOM is loaded...
$(document).ready(() => {
  getAllPersonnelData(); // Call function to initial load personnel table
  getAllDepartmentsData(); // Call function to initial load departments table
  getAllLocationsData(); // Call function to initial load locations table

  // Change search bar placeholder text based on current tab
  $("#personnelBtn").click(function () {
    $("#searchInp").attr("placeholder", "Search Personnel");
    // Also refresh personnel table
    refreshIconAnimation();
    getAllPersonnelData();
    // Enable filter btn
    $("#filterBtn").attr("disabled", false);
  });
  $("#departmentsBtn").click(function () {
    $("#searchInp").attr("placeholder", "Search Departments");
    // Also refresh departments table
    refreshIconAnimation();
    getAllDepartmentsData();
    // Disable filter btn
    $("#filterBtn").attr("disabled", true);
  });
  $("#locationsBtn").click(function () {
    $("#searchInp").attr("placeholder", "Search Locations");
    // Also refresh locations table
    refreshIconAnimation();
    getAllLocationsData();
    // Disable filter btn
    $("#filterBtn").attr("disabled", true);
  });
});

// - BUTTONS -
// Search Bar
$("#searchInp").on("keyup", function () {
  // Check for active tab
  if ($("#personnelBtn").hasClass("active")) {
    // If active tab = personnel, ajax call search by personnel
    $.ajax({
      url: "php/searchAll.php",
      type: "POST",
      dataType: "json",
      data: {
        txt: $("#searchInp").val(),
      },
      success: function (result) {
        if (result.status.code == 200) {
          let personnelSearchResults = result.data.found;
          // console.log("Sucess - Personnel Search Results: ", personnelSearchResults);

          populatePersonnelTable(personnelSearchResults);
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("Personnel Search Error");
      },
    });
  } else {
    if ($("#departmentsBtn").hasClass("active")) {
      // If active tab = departments, ajax call search by departments
      $.ajax({
        url: "php/searchDepartments.php",
        type: "POST",
        dataType: "json",
        data: {
          txt: $("#searchInp").val(),
        },
        success: function (result) {
          if (result.status.code == 200) {
            let departmentsSearchResults = result.data.found;
            // console.log("Sucess - Departments Search Results: ", departmentsSearchResults);

            populateDepartmentsTable(departmentsSearchResults);
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("Departments Search Error");
        },
      });
    } else {
      if ($("#locationsBtn").hasClass("active")) {
        // If active tab = locations, ajax call search by locations
        $.ajax({
          url: "php/searchLocations.php",
          type: "POST",
          dataType: "json",
          data: {
            txt: $("#searchInp").val(),
          },
          success: function (result) {
            if (result.status.code == 200) {
              let locationsSearchResults = result.data.found;
              // console.log("Sucess - Locations Search Results: ", locationsSearchResults);

              populateLocationsTable(locationsSearchResults);
            }
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.log("Locations Search Error");
          },
        });
      }
    }
  }
});

// Refresh Button
$("#refreshBtn").click(function () {
  refreshIconAnimation();

  if ($("#personnelBtn").hasClass("active")) {
    // Clear personnel search input
    $("#searchInp").val("");
    // Refresh personnel table
    getAllPersonnelData();
  } else {
    if ($("#departmentsBtn").hasClass("active")) {
      // Clear departments search input
      $("#searchInp").val("");
      // Refresh departments table
      getAllDepartmentsData();
    } else {
      // Clear locations search input
      $("#searchInp").val("");
      // Refresh locations table
      getAllLocationsData();
    }
  }
});

// Filter Button
$("#filterBtn").click(function () {
  // Show Filter Modal
  $("#filterModal").modal("show");
});

// Add Button
$("#addBtn").click(function () {
  if ($("#personnelBtn").hasClass("active")) {
    // Show Add Employee Modal
    $("#addPersonnelModal").modal("show");
  } else {
    if ($("#departmentsBtn").hasClass("active")) {
      // Show Add Department Modal
      $("#addDepartmentModal").modal("show");
    } else {
      // Show Add Location Modal
      $("#addLocationModal").modal("show");
    }
  }
});

// - MODALS -
// PERSONNEL MODALS
// Edit Personnel Modal
$("#editPersonnelModal").on("show.bs.modal", function (e) {
  $.ajax({
    url: "php/getPersonnelByID.php",
    type: "POST",
    dataType: "json",
    data: { id: $(e.relatedTarget).attr("data-id") }, // Retrieves data-id attrib. from calling btn.
    success: function (result) {
      if (result.status.code == 200) {
        // Testing
        // console.log("Sucess - Selected Personnel Data: ", result.data)

        $("#editPersonnelEmployeeID").val(result.data.personnel[0].id); // Updates hidden input with employee id, so can be referenced when form submitted

        $("#editPersonnelFirstName").val(result.data.personnel[0].firstName);
        $("#editPersonnelLastName").val(result.data.personnel[0].lastName);
        $("#editPersonnelJobTitle").val(result.data.personnel[0].jobTitle);
        $("#editPersonnelEmailAddress").val(result.data.personnel[0].email);

        $("#editPersonnelDepartment").html("");
        $.each(result.data.department, function () {
          $("#editPersonnelDepartment").append(
            $("<option>", {
              value: this.id,
              text: this.name,
            })
          );
        });

        $("#editPersonnelDepartment").val(
          result.data.personnel[0].departmentID
        );
      } else {
        $("#editPersonnelModal .modal-title").html("Error retrieving data");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#editPersonnelModal .modal-title").html("Error retrieving data");
    },
  });
});

// Edit Personnel Modal - Form Submit Btn Clicked
$("#editPersonnelForm").on("submit", function (e) {
  // Executes when the form button with type="submit" is clicked
  // Stop the default browser behviour
  e.preventDefault();
  // AJAX call to save form data
  $.ajax({
    url: "php/updatePersonnelByID.php",
    type: "POST",
    dataType: "json",
    data: {
      id: $("#editPersonnelEmployeeID").val(),
      firstName: $("#editPersonnelFirstName").val(),
      lastName: $("#editPersonnelLastName").val(),
      jobTitle: $("#editPersonnelJobTitle").val(),
      email: $("#editPersonnelEmailAddress").val(),
      departmentID: $("#editPersonnelDepartment").val(),
    },
    success: function (result) {
      if (result.status.code == 200) {
        // Hide edit personnel modal
        $("#editPersonnelModal").modal("hide");
        // Refreshes personnel results
        getAllPersonnelData();
      } else {
        // Show personnel edit error modal
        $("#editPersonnelErrorModal").modal("show");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      // Show personnel edit error modal
      $("#editPersonnelModal .modal-title").html("Error retrieving data");
    },
  });
});

// Delete Personnel Modal
$("#deletePersonnelModal").on("show.bs.modal", function (e) {
  $.ajax({
    url: "php/getPersonnelByID.php",
    type: "POST",
    dataType: "json",
    data: { id: $(e.relatedTarget).attr("data-id") }, // Retrieves data-id attrib. from calling btn.
    success: function (result) {
      if (result.status.code == 200) {
        $("#deletePersonnelEmployeeID").html(result.data.personnel[0].id); // Updates hidden input with employee id, so can be referenced when deletion confirmed
        $("#deletePersonnelModal #deletePersonnelConfirmMsg").html(
          `Are you sure you want to delete <strong>${result.data.personnel[0].firstName} ${result.data.personnel[0].lastName}</strong>, from the database?`
        );

        // Testing
        // console.log("Sucess - Selected Personnel Data: ", result.data)
        // console.log("Employee ID retrieved: ", $("#deletePersonnelEmployeeID").text());
      } else {
        $("#deletePersonnelModal .modal-title").html("Error retrieving data");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#deletePersonnelModal .modal-title").html("Error retrieving data");
    },
  });
});

// Delete Personnel Modal - Form Submit Btn Clicked
$("#deletePersonnelForm").on("submit", function (e) {
  // Stop the default browser behviour
  e.preventDefault();

  $.ajax({
    url: "php/deletePersonnelByID.php",
    type: "POST",
    dataType: "json",
    data: { id: $("#deletePersonnelEmployeeID").text() }, // Retrieves employee id from hidden form input
    success: function (result) {
      if (result.status.code == 200) {
        // Refreshes personnel results
        getAllPersonnelData();
      } else {
        // Show personnel deletion error modal
        $("#deletePersonnelErrorModal").modal("show");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#deletePersonnelModal .modal-title").html("Error retrieving data");
    },
  });
});

// Add Personnel Modal
$("#addPersonnelModal").on("show.bs.modal", function (e) {
  // Get all departments
  $.ajax({
    url: "php/getAllDepartments.php",
    type: "POST",
    dataType: "JSON",
    success: function (result) {
      if (result.status.code === "200") {
        // Testing
        // console.log("Sucess - Departments Data: ", result.data);
        let allDepartmentsData = result.data;

        // Populate departments drop-down
        $("#addPersonnelDepartment").html("");
        $.each(allDepartmentsData, function () {
          $("#addPersonnelDepartment").append(
            $("<option>", {
              value: this.id,
              text: this.name,
            })
          );
        });
      } else {
        $("#addPersonnelModal .modal-title").html("Error retrieving data");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#addPersonnelModal .modal-title").html("Error retrieving data");
    },
  });
});

// Add Personnel Modal - Form Submit Btn Clicked
$("#addPersonnelForm").on("submit", function (e) {
  // Stop the default browser behviour
  e.preventDefault();
  // AJAX call to save form data
  $.ajax({
    url: "php/insertNewPersonnel.php",
    type: "POST",
    dataType: "json",
    data: {
      firstName: $("#addPersonnelFirstName").val(),
      lastName: $("#addPersonnelLastName").val(),
      jobTitle: $("#addPersonnelJobTitle").val(),
      email: $("#addPersonnelEmailAddress").val(),
      departmentID: $("#addPersonnelDepartment").val(),
    },
    success: function (result) {
      if (result.status.code == 200) {
        // Hide add personnel modal
        $("#addPersonnelModal").modal("hide");
        // Refreshes personnel results
        getAllPersonnelData();
      } else {
        // Show personnel addition error modal
        $("addPersonnelErrorModal").modal("show");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#addPersonnelModal .modal-title").html("Error retrieving data");
    },
  });
});

// Add Personnel Modal - On Modal Hidden
$("#addPersonnelModal").on("hidden.bs.modal", function (e) {
  // Reset values of form inputs
  $("#addPersonnelFirstName").val("");
  $("#addPersonnelLastName").val("");
  $("#addPersonnelJobTitle").val("");
  $("#addPersonnelEmailAddress").val("");
  $("#addPersonnelDepartment").val("");
});

// DEPARTMENT MODALS
// Edit Department Modal
$("#editDepartmentModal").on("show.bs.modal", function (e) {
  $.ajax({
    url: "php/getDepartmentByID.php",
    type: "POST",
    dataType: "json",
    data: { id: $(e.relatedTarget).attr("data-id") }, // Retrieves data-id attrib. from calling btn.
    success: function (result) {
      if (result.status.code == 200) {
        // Testing
        console.log("Sucess - Selected Department Data: ", result.data);

        $("#editDepartmentID").val(result.data[0].id); // Updates hidden input with department id, so can be referenced when form submitted
        $("#editDepartmentName").val(result.data[0].name);

        // Populate locations drop-down
        $("#editDepartmentLocation").html("");
        $.each(result.data.locations, function () {
          $("#editDepartmentLocation").append(
            $("<option>", {
              value: this.id,
              text: this.name,
            })
          );
        });
        $("#editDepartmentLocation").val(result.data.department[0].locationID);
      } else {
        $("#editDepartmentModal .modal-title").html("Error retrieving data");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#editDepartmentModal .modal-title").html("Error retrieving data");
    },
  });
});

// Edit Department Modal - Form Submit Btn Clicked
$("#editDepartmentForm").on("submit", function (e) {
  // Stop the default browser behviour
  e.preventDefault();
  // AJAX call to save form data
  $.ajax({
    url: "php/updateDepartmentByID.php",
    type: "POST",
    dataType: "json",
    data: {
      id: $("#editDepartmentID").val(),
      name: $("#editDepartmentName").val(),
      locationID: $("#editDepartmentLocation").val(),
    },
    success: function (result) {
      if (result.status.code == 200) {
        // Hide edit department modal
        $("#editDepartmentModal").modal("hide");
        // Refreshes departments results
        getAllDepartmentsData();
      } else {
        // Show department edit error modal
        $("#editDepartmentErrorModal").modal("show");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#editDepartmentModal .modal-title").html("Error retrieving data");
    },
  });
});

// Delete Department Modal
$("#departmentTableBody").on("click", ".delDeptBtn", function () {
  // Uses Event Delegation
  $.ajax({
    url: "php/checkDepartmentDependencies.php",
    type: "POST",
    dataType: "json",
    data: { id: $(this).attr("data-id") }, // Retrieves data-id attribute from calling btn.
    success: function (result) {
      if (result.status.code == 200) {
        // console.log(result.data);
        // If department has NO employees
        if (result.data[0].numPersonnel == 0) {
          $("#deleteDepartmentID").val(result.data[0].departmentId); // Updates hidden input with department id, so can be referenced when deletion confirmed
          $("#deleteDepartmentModal #deleteDepartmentConfirmMsg").html(
            `Are you sure you want to delete the <strong>${result.data[0].departmentName}</strong> department, from the database?`
          );
          $("#deleteDepartmentModal").modal("show");

          // Testing
          // console.log("Department Clicked", result.data[0].departmentId);
        } else {
          // Department HAS employees
          $("#cantDeleteDepartmentModal #cantDeleteDepartmentMsg").html(
            `Could not delete the <strong>${result.data[0].departmentName}</strong> department, as there are <strong>${result.data[0].numPersonnel} Employee(s)</strong> assigned to it.`
          );

          // Testing
          // console.log("Department Clicked", result.data[0].departmentId);
        }
      } else {
        // Show department deletion error modal
        $("#deleteDepartmentErrorModal").modal("show");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#deleteDepartmentModal .modal-title").html("Error retrieving data");
    },
  });
});

// Delete Department Modal - Form Submit Btn Clicked
$("#deleteDepartmentForm").on("submit", function (e) {
  // Stop the default browser behviour
  e.preventDefault();

  $.ajax({
    url: "php/deleteDepartmentByID.php",
    type: "POST",
    dataType: "json",
    data: { id: $("#deleteDepartmentID").val() }, // Retrieves department id val from hidden input
    success: function (result) {
      // Testing
      // console.log("Department Deleted (By id): ", $("#deleteDepartmentID").val());

      if (result.status.code == 200) {
        // Refreshes departments results
        getAllDepartmentsData();
      } else {
        // Show department deletion error modal
        $("#deleteDepartmentErrorModal").modal("show");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#deleteDepartmentModal .modal-title").html("Error retrieving data");
    },
  });
});

// Add Department Modal
$("#addDepartmentModal").on("show.bs.modal", function (e) {
  // Get all locations for drop down
  $.ajax({
    url: "php/getAllLocations.php",
    type: "POST",
    dataType: "JSON",
    success: function (result) {
      if (result.status.code === "200") {
        // console.log("Sucess - Retrieved Locations Data: ", result.data);
        let allLocationsData = result.data;

        // Populate locations drop-down
        $("#addDepartmentLocation").html("");
        $.each(allLocationsData, function () {
          $("#addDepartmentLocation").append(
            $("<option>", {
              value: this.id,
              text: this.name,
            })
          );
        });
      } else {
        $("#addDepartmentModal .modal-title").html("Error retrieving data");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#addDepartmentModal .modal-title").html("Error retrieving data");
    },
  });
});

// Add Department Modal - Form Submit Btn Clicked
$("#addDepartmentForm").on("submit", function (e) {
  // Stop the default browser behviour
  e.preventDefault();
  // AJAX call to save form data
  $.ajax({
    url: "php/insertNewDepartment.php",
    type: "POST",
    dataType: "json",
    data: {
      name: $("#addDepartmentName").val(),
      locationID: $("#addDepartmentLocation").val(),
    },
    success: function (result) {
      if (result.status.code == 200) {
        // Hide add department modal
        $("#addDepartmentModal").modal("hide");
        // Refreshes pepartment results
        getAllDepartmentsData();
      } else {
        // Show department addition error modal
        $("addDepartmentErrorModal").modal("show");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#addDepartmentModal .modal-title").html("Error retrieving data");
    },
  });
});

// Add Department Modal - On Modal Hidden
$("#addDepartmentModal").on("hidden.bs.modal", function (e) {
  // Reset values of form inputs
  $("#addDepartmentName").val("");
  $("#addDepartmentLocation").val("");
});

// LOCATION MODALS
// Edit Location Modal
$("#editLocationModal").on("show.bs.modal", function (e) {
  $.ajax({
    url: "php/getLocationByID.php",
    type: "POST",
    dataType: "json",
    data: { id: $(e.relatedTarget).attr("data-id") }, // Retrieves data-id attrib. from calling btn.
    success: function (result) {
      if (result.status.code == 200) {
        // Testing
        // console.log("Sucess - Selected Location Data: ", result.data)

        $("#editLocationID").val(result.data[0].id); // Updates hidden input with location id, so can be referenced on form submit
        $("#editLocationName").val(result.data[0].name);
      } else {
        $("#editLocationModal .modal-title").html("Error retrieving data");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#editLocationModal .modal-title").html("Error retrieving data");
    },
  });
});

// Edit Location Modal - Form Submit Btn Clicked
$("#editLocationForm").on("submit", function (e) {
  // Stop the default browser behviour
  e.preventDefault();
  // AJAX call to save form data
  $.ajax({
    url: "php/updateLocationByID.php",
    type: "POST",
    dataType: "json",
    data: {
      id: $("#editLocationID").val(),
      name: $("#editLocationName").val(),
    },
    success: function (result) {
      if (result.status.code == 200) {
        // Hide edit location modal
        $("#editLocationModal").modal("hide");
        // Refreshes locations results
        getAllLocationsData();
      } else {
        // Show location edit error modal
        $("#editLocationErrorModal").modal("show");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#editLocationModal .modal-title").html("Error retrieving data");
    },
  });
});

// Delete Location Modal
$("#locationTableBody").on("click", ".delLocBtn", function () {
  // Uses Event Delegation
  $.ajax({
    url: "php/checkLocationDependencies.php",
    type: "POST",
    dataType: "json",
    data: { id: $(this).attr("data-id") }, // Retrieves data-id attribute from calling btn.
    success: function (result) {
      if (result.status.code == 200) {
        // console.log(result.data);
        // If location has NO departments
        if (result.data[0].numDepartments == 0) {
          $("#deleteLocationID").val(result.data[0].locationId); // Updates hidden input with location id, so can be referenced when deletion confirmed
          $("#deleteLocationModal #deleteLocationConfirmMsg").html(
            `Are you sure you want to delete the <strong>${result.data[0].locationName}</strong> location, from the database?`
          );
          $("#deleteLocationModal").modal("show");

          // Testing
          // console.log("Location Clicked", result.data[0].locationId);
        } else {
          // Location HAS departments
          $("#cantDeleteLocationModal #cantDeleteLocationtMsg").html(
            `Could not delete the <strong>${result.data[0].locationName}</strong> location, as there are <strong>${result.data[0].numDepartments} Department(s)</strong> assigned to it.`
          );
          $("#cantDeleteLocationModal").modal("show");

          // Testing
          // console.log("Location Clicked", result.data[0].locationId);
        }
      } else {
        // Show location deletion error modal
        $("#deleteLocationErrorModal").modal("show");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#deleteLocationModal .modal-title").html("Error retrieving data");
    },
  });
});

// Delete Location Modal - Form Submit Btn Clicked
$("#deleteLocationForm").on("submit", function (e) {
  // Stop the default browser behviour
  e.preventDefault();

  $.ajax({
    url: "php/deleteLocationByID.php",
    type: "POST",
    dataType: "json",
    data: { id: $("#deleteLocationID").val() }, // Retrieves location id val from hidden input
    success: function (result) {
      // Testing
      // console.log("Location Deleted (By id): ", $("#deleteLocationID").val());

      if (result.status.code == 200) {
        // Refreshes locations results
        getAllLocationsData();
      } else {
        // Show department deletion error modal
        $("#deleteLocationErrorModal").modal("show");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#deleteLocationModal .modal-title").html("Error retrieving data");
    },
  });
});

// Add Location Modal - Form Submit Btn Clicked
$("#addLocationForm").on("submit", function (e) {
  // Stop the default browser behviour
  e.preventDefault();
  // AJAX call to save form data
  $.ajax({
    url: "php/insertNewLocation.php",
    type: "POST",
    dataType: "json",
    data: {
      name: $("#addLocationName").val(),
    },
    success: function (result) {
      if (result.status.code == 200) {
        // Hide add location modal
        $("#addLocationModal").modal("hide");
        // Refreshes locations results
        getAllLocationsData();
      } else {
        // Show location addition error modal
        $("addLocationErrorModal").modal("show");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#addLocationModal .modal-title").html("Error retrieving data");
    },
  });
});

// Add Location Modal - On Modal Hidden
$("#addLocationModal").on("hidden.bs.modal", function (e) {
  // Reset values of form inputs
  $("#addLocationName").val("");
});

// FILTER MODAL
// Vars to store currently selected options of filter dropdowns
let currentDeptVal = 0;
let currentLocVal = 0;

// Filter Personnel Modal
$("#filterModal").on("show.bs.modal", function (e) {
  // Get all departments for drop down
  $.ajax({
    url: "php/getAllDepartments.php",
    type: "POST",
    dataType: "JSON",
    success: function (result) {
      if (result.status.code === "200") {
        // console.log("Sucess - Retrieved Departments Data: ", result.data);
        let allDepartmentData = result.data;

        // Clear the dropdown of any previous values
        $("#filterByDepartment").html("");

        // Append "All" first
        $("#filterByDepartment").append(
          $("<option>", {
            value: 0,
            text: "All",
          })
        );

        // Then populate drop-down with all departments
        $.each(allDepartmentData, function () {
          $("#filterByDepartment").append(
            $("<option>", {
              value: this.id,
              text: this.name,
            })
          );
        });

        // Set department dropdown to the currently selected value
        $("#filterByDepartment").val(currentDeptVal);
      } else {
        $("#filterModal .modal-title").html("Error retrieving data");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#filterModal .modal-title").html("Error retrieving data");
    },
  });

  // Get all locations for drop down
  $.ajax({
    url: "php/getAllLocations.php",
    type: "POST",
    dataType: "JSON",
    success: function (result) {
      if (result.status.code === "200") {
        // console.log("Sucess - Retrieved Locations Data: ", result.data);
        let allLocationsData = result.data;

        // Clear the dropdown of any previous values
        $("#filterByLocation").html("");

        // Append "Select a Location" first
        $("#filterByLocation").append(
          $("<option>", {
            value: 0,
            text: "All",
          })
        );

        // Then populate drop-down with all locations
        $.each(allLocationsData, function () {
          $("#filterByLocation").append(
            $("<option>", {
              value: this.id,
              text: this.name,
            })
          );
        });

        // Set location dropdown to the currently selected value
        $("#filterByLocation").val(currentLocVal);
      } else {
        $("#filterModal .modal-title").html("Error retrieving data");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#filterModal .modal-title").html("Error retrieving data");
    },
  });
});

// Filter Personnel Modal - On Department Selected
$("#filterByDepartment").change(function () {
  // Store the currently selected department's value
  currentDeptVal = $("#filterByDepartment").val();
  console.log(currentDeptVal);

  // Check if default option NOT selected
  if ($("#filterByDepartment").val() != 0) {
    // Reset locations dropdown to default value
    $("#filterByLocation").val(0);
    // Reset stored, current department value to default value
    currentLocVal = 0;

    $.ajax({
      url: "php/filterPersonnelByDepartment.php",
      type: "POST",
      dataType: "json",
      data: {
        departmentID: $("#filterByDepartment").val(),
      },
      success: function (result) {
        if (result.status.code == 200) {
          populatePersonnelTable(result.data);
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("Error");
      },
    });
  } else {
    // Else default option IS selected
    // Reset department dropdown to default value
    $("#filterByDepartment").val(0);
    // Refresh/reload Personnel table
    getAllPersonnelData();
  }
});

// Filter Personnel Modal - On Location Selected
$("#filterByLocation").change(function () {
  // Store the currently selected location's value
  currentLocVal = $("#filterByLocation").val();
  console.log(currentLocVal);

  // Check if default option NOT selected
  if ($("#filterByLocation").val() != 0) {
    // Reset departments dropdown to default value
    $("#filterByDepartment").val(0);
    // Reset stored, current department value to default value
    currentDeptVal = 0;

    $.ajax({
      url: "php/filterPersonnelByLocation.php",
      type: "POST",
      dataType: "json",
      data: {
        locationID: $("#filterByLocation").val(),
      },
      success: function (result) {
        if (result.status.code == 200) {
          populatePersonnelTable(result.data);
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("Error");
      },
    });
  } else {
    // Else default option IS selected
    // Reset location dropdown to default value
    $("#filterByLocation").val(0);
    // Refresh/reload Personnel table
    getAllPersonnelData();
  }
});
