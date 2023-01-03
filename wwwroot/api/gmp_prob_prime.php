<?php

require_once('../common/json.php');

$requestData = get_json_from_stream();

if (isset($requestData->number)) {
  $n = $requestData->number;
  $result = gmp_prob_prime($n);
  $response = array('result' => $result);
  echo json_encode($response);
} else {
  http_response_code(400);
  $response = array('error' => 'No number provided');
  echo json_encode($response);
}

?>
