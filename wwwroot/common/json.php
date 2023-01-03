<?php
function get_json_from_stream() {
  $requestBody = file_get_contents('php://input');
  $requestData = json_decode($requestBody);
  return $requestData;
}
?>
