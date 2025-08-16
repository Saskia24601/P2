<?php

// remove next two lines for production
ini_set('display_errors', 'On');
error_reporting(E_ALL);

$executionStartTime = microtime(true);
include("config.php");
header('Content-Type: application/json; charset=UTF-8');

// Connect to database
$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

if (mysqli_connect_errno()) {
  $output['status']['code'] = "300";
  $output['status']['name'] = "failure";
  $output['status']['description'] = "database unavailable";
  $output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
  $output['data'] = [];

  mysqli_close($conn);
  echo json_encode($output);
  exit;
}

// Extract and sanitize POST data
$firstName = isset($_POST['firstName']) ? trim($_POST['firstName']) : '';
$lastName = isset($_POST['lastName']) ? trim($_POST['lastName']) : '';
$jobTitle = isset($_POST['jobTitle']) ? trim($_POST['jobTitle']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$departmentID = isset($_POST['departmentID']) ? intval($_POST['departmentID']) : 0;

// Validate required fields
if (
  $firstName === '' ||
  $lastName === '' ||
  $email === '' ||
  $departmentID <= 0 ||
  !filter_var($email, FILTER_VALIDATE_EMAIL)
) {
  $output['status']['code'] = "500";
  $output['status']['name'] = "Validation error";
  $output['status']['description'] = "Missing or invalid required fields";
  $output['data'] = [];

  mysqli_close($conn);
  echo json_encode($output);
  exit;
}

// Prepare the SQL statement
$query = $conn->prepare('INSERT INTO personnel (firstName, lastName, jobTitle, email, departmentID) VALUES (?, ?, ?, ?, ?)');

if ($query === false) {
  $output['status']['code'] = "400";
  $output['status']['name'] = "executed";
  $output['status']['description'] = "query preparation failed: " . $conn->error;
  $output['data'] = [];

  mysqli_close($conn);
  echo json_encode($output);
  exit;
}

// Bind parameters with sanitized values
$query->bind_param("ssssi", $firstName, $lastName, $jobTitle, $email, $departmentID);

// Execute query and check for failure
if (!$query->execute()) {
  $output['status']['code'] = "400";
  $output['status']['name'] = "executed";
  $output['status']['description'] = "query failed: " . $query->error;
  $output['data'] = [];

  mysqli_close($conn);
  echo json_encode($output);
  exit;
}

// Success response
$output['status']['code'] = "200";
$output['status']['name'] = "ok";
$output['status']['description'] = "success";
$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
$output['data'] = [];

mysqli_close($conn);
echo json_encode($output);

?>