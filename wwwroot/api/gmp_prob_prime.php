<?php
require_once('../common/json.php');

function gmp_prob_prime($n) {
  $n = gmp_init($n);
  return gmp_prob_prime($n);
}

$requestData = get_json_from_stream();

if (isset($requestData->number)) {
  $n = $requestData->number;
  $result = gmp_prob_prime($n);
  $response = array('result' => $result);
  echo json_encode($response);
}

?>
