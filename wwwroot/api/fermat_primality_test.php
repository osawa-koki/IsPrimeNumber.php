<?php

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  // CORSのプリフライトリクエストの場合、HTTPステータスを200に設定して終了する
  http_response_code(200);
  exit();
}

require_once('../common/json.php');

$requestData = get_json_from_stream();

function fermat_primality_test($n, $k) {
  if ($n == 2 || $n == 3) {
    return 2; // 絶対に素数
  }
  if ($n <= 1 || $n % 2 == 0) {
    return 0; // 非素数
  }

  for ($i = 0; $i < $k; $i++) {
    $a = rand(2, $n - 2);
    if (gmp_powm($a, $n - 1, $n) != 1) {
      return 0; // 非素数
    }
  }
  return 1; // 多分素数
}

if (isset($requestData->number)) {
  $n = $requestData->number;
  $k = $requestData->k;
  if (!isset($k) || $k > 100) {
    $k = 50;
  }
  $result = fermat_primality_test($n, $k);
  $response = [];
  $response['result'] = $result;
  $response['number'] = $n;
  $response['k'] = $k;
  echo json_encode($response);
} else {
  http_response_code(400);
  $response = array('error' => 'No number provided');
  echo json_encode($response);
}

?>
