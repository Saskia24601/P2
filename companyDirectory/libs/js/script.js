let allDepartments = [];
let allLocations = [];

const toastify = (text, backgroundColor) => {
  Toastify({
    text: text,
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "top",
    positionLeft: true,
    backgroundColor: backgroundColor,
  }).showToast();
};

// ---------------------------------------------------------
//AJAX Requests
// ---------------------------------------------------------

// ***. Personnel *****

const getAllPersonnelInfo = () => {
  $.ajax({
    type: "POST",
    url: "libs/php/getAll.php",
    dataType: "json",
    success: (response) => {
      if (response.status.code === "200") {
        console.log("Personnel data loaded:", response.data);
        populatePersonnelData(response.data);
      } else {
        toastify("Failed to load personnel data", "red");
      }
    },
    error: (xhr, status, error) => {
      toastify("Could not load personnel data", "red");
    },
  });
};

//Create Personnel
const createPersonnel = (
  firstName,
  lastName,
  jobTitle,
  email,
  departmentID
) => {
  $.ajax({
    type: "POST",
    url: "libs/php/insertPersonnel.php",
    dataType: "json",
    data: { firstName, lastName, jobTitle, email, departmentID },
    success: (response) => {
      if (response.status.code === "200") {
        getAllPersonnelInfo();
        toastify("Personnel successfully added", "green");
      } else {
        toastify("Failed to create personnel", "red");
      }
    },
    error: (xhr, status, error) => {
      toastify("Could not create personnel data", "red");
    },
  });
};

// Delete Personnel by ID
const deletePersonnelByID = (id) => {
  $.ajax({
    type: "POST",
    url: "libs/php/deletePersonnelByID.php",
    dataType: "json",
    data: { id },
    success: (response) => {
      if (response.status.code === "200") {
        getAllPersonnelInfo();
      } else {
        toastify("Failed to delete personnel", "red");
      }
    },
    error: (xhr, status, error) => {
      toastify("Could not delete personnel data", "red");
    },
  });
};

// **** Departments. ****

const getAllDepartmentInfo = () => {
  $.ajax({
    type: "POST",
    url: "libs/php/getAllDepartments.php",
    dataType: "json",
    success: (response) => {
      if (response.status.code === "200") {
        allDepartments = response.data;
        populateDepartmentData(allDepartments);
      } else {
        toastify("Failed to load department data", "red");
      }
    },
    error: (xhr, status, error) => {
      toastify("Could not load department data", "red");
    },
  });
};

//Create Department
const createDepartment = (name, locationID) => {
  $.ajax({
    type: "POST",
    url: "libs/php/insertDepartment.php",
    dataType: "json",
    data: { name, locationID },
    success: (response) => {
      if (response.status.code === "200") {
        getAllDepartmentInfo();
      } else {
        toastify("Failed to create department", "red");
      }
    },
    error: (xhr, status, error) => {
      toastify("Could not create department data", "red");
    },
  });
};

//Update Department by ID

const updateDepartmentByID = (name, locationID) => {
  $.ajax({
    type: "POST",
    url: "libs/php/updateDepartmentByID.php",
    dataType: "json",
    data: {
      id: $("#editDepartmentID").val(),
      name: $("#editDepartmentName").val(),
      locationID: $("#editDepartmentLocationID").val(),
    },
    success: (response) => {
      if (response.status.code === "200") {
        getAllDepartmentInfo();
      } else {
        toastify("Failed to update department by ID", "red");
      }
    },
    error: (xhr, status, error) => {
      toastify("Could not update department data", "red");
    },
  });
};

// **** Locations ****

const getAllLocationInfo = () => {
  $.ajax({
    type: "POST",
    url: "libs/php/getAllLocations.php",
    dataType: "json",
    success: (response) => {
      if (response.status.code === "200") {
        allLocations = response.data;
        populateLocationsData(allLocations);
      } else {
        toastify("Failed to get location data", "red");
      }
    },
    error: (xhr, status, error) => {
      toastify("Could not load location data", "red");
    },
  });
};

//Create Location
const createLocation = (name) => {
  $.ajax({
    type: "POST",
    url: "libs/php/insertLocation.php",
    dataType: "json",
    data: { name },
    success: (response) => {
      if (response.status.code === "200") {
        getAllLocationInfo();
      } else {
        toastify("Failed to create location", "red");
      }
    },
    error: (xhr, status, error) => {
      toastify("Could not create location data", "red");
    },
  });
};

//Update Location by ID

const updateLocationByID = () => {
  $.ajax({
    type: "POST",
    url: "libs/php/updateLocationByID.php",
    dataType: "json",
    data: {
      id: $("#editLocationID").val(),
      name: $("#editLocationName").val(),
    },
    success: (response) => {
      if (response.status.code === "200") {
        getAllLocationInfo();
      } else {
        toastify("Failed to update location by ID", "red");
      }
    },
    error: (xhr, status, error) => {
      toastify("Could not update location data", "red");
    },
  });
};

// Delete Location by ID
const deleteLocationByID = (id) => {
  $.ajax({
    type: "POST",
    url: "libs/php/deleteLocationByID.php",
    data: { id },
    dataType: "json",
    success: (response) => {
      if (response.status.code === "200") {
        toastify("Deleted successfully", "green");
        getAllLocationInfo();
      } else {
        toastify("Failed to delete location by ID", "red");
      }
    },
    error: (xhr, status, error) => {
      toastify("Could not delete location by ID", "red");
    },
  });
};

// ---------------------------------------------------------
//Populate Tables
// ---------------------------------------------------------

const populatePersonnelData = (personnelData) => {
  let html = "";

  personnelData.forEach((emp) => {
    html += `
     <tr>
      <td class="align-middle text-nowrap">${emp.lastName}, ${emp.firstName}</td>
      <td class="align-middle text-nowrap d-none d-md-table-cell dep-name">${emp.department}</td>
      <td class="align-middle text-nowrap d-none d-md-table-cell loc-name">${emp.location}</td>
      <td class="align-middle text-nowrap d-none d-md-table-cell">${emp.email}</td>
      <td class="text-end text-nowrap">
        <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#editPersonnelModal" data-id="${emp.id}">
          <i class="fa-solid fa-pencil fa-fw"></i>
              </button>
        <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#deletePersonnelModal" data-id="${emp.id}">
          <i class="fa-solid fa-trash fa-fw"></i>
              </button>
            </td>
          </tr>
      `;
  });
  $("#personnelTableBody").html(html);
};

//Populate Department Data
const populateDepartmentData = (data) => {
  let html = "";
  data.forEach((dep) => {
    html += `
      <tr>
       <td class="align-middle text-nowrap">${dep.name}</td>
       <td class="align-middle text-nowrap d-none d-md-table-cell">${dep.locationName}</td>
       <td class="text-end text-nowrap">
          <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#editDepartmentModal" data-id="${dep.id}">
              <i class="fa-solid fa-pencil fa-fw"></i>
          </button>
          <button type="button" class="btn btn-primary btn-sm deleteDepartmentBtn" data-id="${dep.id}">
              <i class="fas fa-trash"></i> 
          </button>
      </td>
    </tr>
      `;
  });
  $("#departmentTableBody").html(html);
};

const populateLocationsData = (data) => {
  let html = "";
  data.forEach((loc) => {
    html += `
      <tr>
        <td class="align-middle text-nowrap">${loc.name}</td>
        <td class="align-middle text-end text-nowrap">
          <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#editLocationModal" data-id="${loc.id}">
              <i class="fa-solid fa-pencil fa-fw"></i>
          </button>
          <button type="button" class="btn btn-primary btn-sm deleteLocationBtn" data-id="${loc.id}">
              <i class="fas fa-trash"></i> 
          </button>
            </td>
          </tr>
    `;
  });
  $("#locationTableBody").html(html);
};

$(document).ready(function () {
  getAllPersonnelInfo();
  getAllDepartmentInfo();
  getAllLocationInfo();
});

// SEARCH BAR

$("#searchInp").on("keyup", function () {
  const searchText = $(this).val().toLowerCase();

  // Get all rows in the currently visible tab pane
  $(".tab-pane.active tbody tr").each(function () {
    const rowText = $(this).text().toLowerCase();
    $(this).toggle(rowText.includes(searchText));
  });
});

// Clear search and reset visible rows when switching tabs
$('button[data-bs-toggle="tab"]').on("shown.bs.tab", function (e) {
  $("#searchInp").val("");

  const targetPaneId = $(e.target).data("bsTarget");

  $(`${targetPaneId} tbody tr`).show();
});

// Refresh Button

$("#refreshBtn").click(function () {
  $("#searchInp").val("");
  if ($("#personnelBtn").hasClass("active")) {
    getAllPersonnelInfo();
  } else if ($("#departmentBtn").hasClass("active")) {
    getAllDepartmentInfo();
  } else if ($("#locationsBtn").hasClass("active")) {
    getAllLocationInfo();
  }
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

$("#personnelBtn").click(function () {
  getAllPersonnelInfo();
  $("#filterBtn").show();
});

$("#departmentsBtn").click(function () {
  getAllDepartmentInfo();
  $("#filterBtn").hide();
});

$("#locationsBtn").click(function () {
  getAllLocationInfo();
  $("#filterBtn").hide();
});

// Filter Button
$("#filterBtn").click(function () {
  $("#filterModal").modal("show");
});

// Populate dropdowns filter
$("#filterModal").on("show.bs.modal", function (e) {
  // Clear existing dropdowns
  $("#filterDepartmentDropdown").val("");
  $("#filterLocationDropdown").val("");

  //Add All options
  $("#filterDepartmentDropdown").append(
    `<option value="">All Departments</option>`
  );
  $("#filterLocationDropdown").append(
    `<option value="">All Locations</option>`
  );

  // Populate departments
  allDepartments.forEach((dep) => {
    $("#filterDepartmentDropdown").append(
      `<option value="${dep.name}">${dep.name}</option>`
    );
  });

  // Populate locations
  allLocations.forEach((loc) => {
    $("#filterLocationDropdown").append(
      `<option value="${loc.name}">${loc.name}</option>`
    );
  });
});

// Apply filter
$("#applyFilterBtn").click(function () {
  const selectedDept = $("#filterDepartmentDropdown").val();
  const selectedLoc = $("#filterLocationDropdown").val();

  $("#filterModal").modal("hide");
  filterPersonnelTable(selectedDept, selectedLoc);
});

// Filter Options
const filterPersonnelTable = (selectedDeptName, selectedLocName) => {
  $("#personnelTableBody tr").each(function () {
    const row = $(this);
    const rowDept = row.find(".dep-name").text();
    const rowLoc = row.find(".loc-name").text();

    const matchDep = !selectedDeptName || rowDept === selectedDeptName;
    const matchLoc = !selectedLocName || rowLoc === selectedLocName;

    if (matchDep && matchLoc) {
      row.show();
    } else {
      row.hide();
    }
  });
};

// PERSONNEL MODAL
// Edit Personnel
$("#editPersonnelModal").on("show.bs.modal", function (e) {
  $.ajax({
    url: "libs/php/getPersonnelByID.php",
    type: "POST",
    dataType: "json",
    data: { id: $(e.relatedTarget).attr("data-id") }, // Retrieves data-id attrib. from calling btn.
    success: function (result) {
      if (result.status.code == 200) {
        $("#editPersonnelID").val(result.data.personnel[0].id); // Updates hidden input with employee id, so can be referenced when form submitted

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
        toastify("Failed to edit personnel data", "red");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      toastify("Could not edit personnel data", "red");
    },
  });
});

// Executes when the form button with type="submit" is clicked
// Edit Personnel Modal
$("#editPersonnelForm").on("submit", function (e) {
  // Stop the default browser behviour
  e.preventDefault();
  // AJAX call to save form data
  $.ajax({
    url: "libs/php/updatePersonnelByID.php",
    type: "POST",
    dataType: "json",
    data: {
      id: $("#editPersonnelID").val(),
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

        $("#searchInput").val("");

        // Refreshes personnel results
        getAllPersonnelInfo();
      } else {
        toastify("Failed to update personnel data", "red");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      toastify("Could not update personnel data", "red");
    },
  });
});

// Add Personnel Modal
$("#addPersonnelModal").on("show.bs.modal", function (e) {
  $.ajax({
    url: "libs/php/getAllDepartments.php",
    type: "POST",
    dataType: "json",
    success: function (result) {
      if (result.status.code == 200) {
        const $deptSelect = $("#addPersonnelDepartment");
        $deptSelect.empty();
        $deptSelect.append('<option value="">Select Department</option>');

        $.each(result.data, function () {
          $deptSelect.append(
            $("<option>", {
              value: this.id,
              text: this.name,
            })
          );
        });
      } else {
        toastify("Failed to add personnel", "red");
      }
    },
    error: function () {
      toastify("Could not add personnel", "red");
    },
  });
});

// Executes when the form button with type="submit" is clicked
// Add Personnel Modal
$("#addPersonnelForm").on("submit", function (e) {
  // Stop the default browser behviour
  e.preventDefault();
  // AJAX call to save form data
  $.ajax({
    url: "libs/php/insertPersonnel.php",
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
        toastify("Successfully added to personnel", "green");
        // Hide add personnel modal
        $("#addPersonnelModal").modal("hide");
        $("#searchInput").val("");
        // Refreshes personnel results
        getAllPersonnelInfo();
      } else {
        toastify("Failed to add personnel", "red");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      toastify("Could not add personnel", "red");
    },
  });
});

// Add Personnel Modal - On Modal Hidden
$("#addPersonnelModal").on("hidden.bs.modal", function (e) {
  // Reset values of form
  $("#addPersonnelFirstName").val("");
  $("#addPersonnelLastName").val("");
  $("#addPersonnelJobTitle").val("");
  $("#addPersonnelEmailAddress").val("");
  $("#addPersonnelDepartment").val("");
});

// Delete Personnel Modal
$("#deletePersonnelModal").on("show.bs.modal", function (e) {
  $.ajax({
    url: "libs/php/getPersonnelByID.php",
    type: "POST",
    dataType: "json",
    data: { id: $(e.relatedTarget).attr("data-id") }, // Retrieves data-id attrib. from calling btn.
    success: function (result) {
      if (result.status.code == 200) {
        $("#deletePersonnelID").val(result.data.personnel[0].id); // Updates hidden input with employee id, so can be referenced when deletion confirmed
        $("#deletePersonnelModal #deletePersonnelConfirm").html(
          `Are you sure you want to delete <strong>${result.data.personnel[0].firstName} ${result.data.personnel[0].lastName}</strong>, from the database?`
        );
      } else {
        toastify("Failed to delete personnel", "red");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      toastify("Could not delete personnel", "red");
    },
  });
});

// Executes when the form button with type="submit" is clicked
// Delete Personnel Modal
$("#deletePersonnelForm").on("submit", function (e) {
  // Stop the default browser behviour
  e.preventDefault();
  $.ajax({
    url: "libs/php/deletePersonnelByID.php",
    type: "POST",
    dataType: "json",
    data: { id: $("#deletePersonnelID").val() }, // Retrieves employee id from hidden form input
    success: function (result) {
      if (result.status.code == 200) {
        // Refreshes personnel results
        getAllPersonnelInfo();
      } else {
        toastify("Failed to delete personnel", "red");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      toastify("Could not delete personnel", "red");
    },
  });
});

// DEPARTMENT MODAL
// Edit Department Modal
$("#editDepartmentModal").on("show.bs.modal", function (e) {
  $.ajax({
    url: "libs/php/getDepartmentByID.php",
    type: "POST",
    dataType: "json",
    data: { id: $(e.relatedTarget).attr("data-id") }, // Retrieves data-id attrib. from calling btn.
    success: function (result) {
      if (result.status.code == 200) {
        $("#editDepartmentID").val(result.data.department[0].id); // Updates hidden input with employee id, so can be referenced when form submitted
        $("#editDepartmentName").val(result.data.department[0].name);

        // Populate locations drop-down
        $("#editDepartmentLocation").html("");
        $.each(result.data.location, function () {
          $("#editDepartmentLocation").append(
            $("<option>", {
              value: this.id,
              text: this.name,
            })
          );
        });
        $("#editDepartmentLocation").val(result.data.department[0].locationID);
      } else {
        toastify("Failed to edit department data", "red");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      toastify("Could not edit department data", "red");
    },
  });
});

// Executes when the form button with type="submit" is clicked
// Edit Department Modal
$("#editDepartmentForm").on("submit", function (e) {
  // Stop the default browser behviour
  e.preventDefault();
  // AJAX call to save form data
  $.ajax({
    url: "libs/php/updateDepartmentByID.php",
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
        $("#searchInp").val("");
        // Refreshes departments results
        getAllDepartmentInfo();
      } else {
        toastify("Failed to edit department data", "red");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      toastify("Could not edit department data", "red");
    },
  });
});

// Add Department Modal
$("#addDepartmentModal").on("show.bs.modal", function (e) {
  // Get all locations for drop down
  $.ajax({
    url: "libs/php/getAllLocations.php",
    type: "POST",
    dataType: "JSON",
    success: function (result) {
      if (result.status.code === "200") {
        departmentName: $("#addDepartmentName").val(),
          // Populate locations drop-down
          $("#addDepartmentLocation").html("");
        $.each(result.data, function () {
          $("#addDepartmentLocation").append(
            $("<option>", {
              value: this.id,
              text: this.name,
            })
          );
        });
      } else {
        toastify("Failed to add department data", "red");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      toastify("Could not add department data", "red");
    },
  });
});

// Executes when the form button with type="submit" is clicked
// Add Department Modal
$("#addDepartmentForm").on("submit", function (e) {
  // Stop the default browser behviour
  e.preventDefault();
  // AJAX call to save form data
  $.ajax({
    url: "libs/php/insertDepartment.php",
    type: "POST",
    dataType: "json",
    data: {
      name: $("#addDepartmentName").val(),
      locationID: $("#addDepartmentLocation").val(),
    },
    success: function (result) {
      if (result.status.code == 200) {
        toastify("Successfully added to department", "green");
        // Hide add personnel modal
        $("#addDepartmentModal").modal("hide");
        $("#searchInput").val("");
        // Refreshes personnel results
        getAllDepartmentInfo();
      } else {
        toastify("Failed to add department", "red");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      toastify("Could not add department", "red");
    },
  });
});

// Add Department Modal - On Modal Hidden
$("#addDepartmentModal").on("hidden.bs.modal", function (e) {
  // Reset values of form inputs
  $("#addDepartmentName").val("");
  $("#addDepartmentLocation").val("");
});

// Delete Department Modal
$(document).on("click", ".deleteDepartmentBtn", function () {
  const depID = $(this).data("id"); // get id from button
  $("#deleteDepartmentID").val(depID); // store in hidden input

  $.ajax({
    url: "libs/php/getDepartmentByID.php",
    type: "POST",
    dataType: "json",
    data: { id: depID },
    success: function (result) {
      if (result.status.code == 200) {
        const dep = result.data.department[0];
        $("#deleteDepartmentConfirm").html(
          `Are you sure you want to delete <strong>${dep.name}</strong> department, from the database?`
        );
        $("#deleteDepartmentModal").modal("show");
      } else {
        toastify("Failed to load department", "red");
      }
    },
    error: function () {
      toastify("Could not load department", "red");
    },
  });
});

// Confirm Deletion
$("#deleteDepartmentForm").on("submit", function (e) {
  e.preventDefault();

  $.ajax({
    url: "libs/php/deleteDepartmentByID.php",
    type: "POST",
    dataType: "json",
    data: { id: $("#deleteDepartmentID").val() },
    success: function (result) {
      if (result.status.code == 200) {
        getAllDepartmentInfo();
        $("#deleteDepartmentModal").modal("hide"); // close modal after success
      } else {
        toastify("Failed to delete department", "red");
      }
    },
    error: function () {
      toastify("Could not delete department", "red");
    },
  });
});

// LOCATION MODALS
// Edit Location
$("#editLocationModal").on("show.bs.modal", function (e) {
  const button = $(e.relatedTarget); // Button that triggered the modal
  const locationID = button.data("id"); // Get data-id

  $.ajax({
    url: "libs/php/getLocationByID.php",
    type: "POST",
    dataType: "json",
    data: { id: locationID },
    success: function (result) {
      if (result.status.code == 200) {
        $("#editLocationID").val(result.data[0].id); // Updates hidden input
        $("#editLocationName").val(result.data[0].name);
      } else {
        toastify("Failed to edit location data", "red");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      toastify("Could not edit location data", "red");
    },
  });
});

// Executes when the form button with type="submit" is clicked
// Edit Location Modal
$("#editLocationForm").on("submit", function (e) {
  // Stop the default browser behviour
  e.preventDefault();
  // AJAX call to save form data
  $.ajax({
    url: "libs/php/updateLocationByID.php",
    type: "POST",
    dataType: "json",
    data: {
      id: $("#editLocationID").val(),
      name: $("#editLocationName").val(),
    },
    success: function (result) {
      if (result.status.code == 200) {
        // Hide edit location modal
        $("#editLocationModal").trigger("hide.bs.modal");
        $("#searchInput").val("");
        // Refreshes Location results
        getAllLocationInfo();
      } else {
        toastify("Failed to submit editted location data", "red");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      toastify("Could not submit editted data", "red");
    },
  });
});

// Executes when the form button with type="submit" is clicked
// Add Location Modal
$("#addLocationForm").on("submit", function (e) {
  // Stop the default browser behviour
  e.preventDefault();
  // AJAX call to save form data
  $.ajax({
    url: "libs/php/insertLocation.php",
    type: "POST",
    dataType: "json",
    data: {
      name: $("#addLocationName").val(),
    },
    success: function (result) {
      if (result.status.code == 200) {
        toastify("Successfully added to location", "green");
        // Hide add personnel modal
        $("#addLocationModal").modal("hide");
        $("#searchInput").val("");
        // Refreshes personnel results
        getAllLocationInfo();
      } else {
        toastify("Failed to add location", "red");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      toastify("Could not add location", "red");
    },
  });
});

// Add Location Modal - On Modal Hidden
$("#addLocationModal").on("hidden.bs.modal", function (e) {
  // Reset values of form inputs
  $("#addLocationName").val("");
});

// Delete Location Modal
$("#deleteLocationModal").on("show.bs.modal", function (e) {
  $.ajax({
    url: "libs/php/getLocationByID.php",
    type: "POST",
    dataType: "json",
    data: { id: $(e.relatedTarget).attr("data-id") }, // Retrieves data-id attrib. from calling btn.
    success: function (result) {
      if (result.status.code == 200) {
        $("#deleteLocationID").html(result.data.personnel[0].id); // Updates hidden input with employee id, so can be referenced when deletion confirmed
        $("#deleteLocationModal #deleteLocationConfirm").html(
          `Are you sure you want to delete <strong>${result.data[0].locationName}</strong>, from the database?`
        );
      } else {
        toastify("Failed to delete location", "red");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      toastify("Could not delete location", "red");
    },
  });
});

// Executes when the form button with type="submit" is clicked
// Delete Location Modal
$("#deleteLocationForm").on("submit", function (e) {
  // Stop the default browser behviour
  e.preventDefault();
  $.ajax({
    url: "libs/php/deleteLocationByID.php",
    type: "POST",
    dataType: "json",
    data: { id: $("#deleteLocationID").val() }, // Retrieves employee id from hidden form input
    success: function (result) {
      if (result.status.code == 200) {
        // Refreshes personnel results
        getAllLocationInfo();
      } else {
        toastify("Failed to delete location", "red");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      toastify("Could not delete location", "red");
    },
  });
});
