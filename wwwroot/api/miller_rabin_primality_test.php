<?php

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  // CORSのプリフライトリクエストの場合、HTTPステータスを200に設定して終了する
  http_response_code(200);
  exit();
}

require_once('../common/json.php');

$requestData = get_json_from_stream();

function miller_rabin_primality_test($n, $k) {
  if ($n <= 1) return 0;
  if ($n == 2) return 2;
  if ($n % 2 == 0) return 0;
  $d = $n - 1;
  $s = 0;
  while ($d % 2 == 0) {
    $d /= 2;
    $s += 1;
  }
  for ($i = 0; $i < $k; $i++) {
    $a = rand(2, $n - 1);
    $x = pow($a, $d) % $n;
    if ($x == 1 || $x == $n - 1) continue;
    for ($j = 0; $j < $s - 1; $j++) {
      $x = ($x * $x) % $n;
      if ($x == $n - 1) continue 2;
    }
    return 0;
  }
  return 1;
}

if (isset($requestData->number)) {
  $n = $requestData->number;
  $k = $requestData->k;
  if (!isset($k) || $k > 100) $k = 50;
  $result = miller_rabin_primality_test($n, $k);
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
