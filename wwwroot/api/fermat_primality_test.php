<?php
require_once('../common/json.php');

$requestData = get_json_from_stream();

function fermat_primality_test($n, $a) {
  return gmp_powmod($a, $n - 1, $n) == 1;
}

if (isset($requestData->number)) {
  $n = $requestData->number;
  $result = fermat_primality_test($n);
  $response = [];
  $response['result'] = $result;
  $response['number'] = $n;
  echo json_encode($response);
} else {
  http_response_code(400);
  $response = array('error' => 'No number provided');
  echo json_encode($response);
}

?>
