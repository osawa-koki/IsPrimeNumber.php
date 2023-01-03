<?php

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  // CORSのプリフライトリクエストの場合、HTTPステータスを200に設定して終了する
  http_response_code(200);
  exit();
}

require_once('../common/json.php');

$requestData = get_json_from_stream();

if (isset($requestData->number)) {
  $n = $requestData->number;
  $result = gmp_prob_prime($n);
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
