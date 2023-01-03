<?php

require_once('../common/json.php');

$requestData = get_json_from_stream();

function miller_rabin_primality_test($n) {
  if ($n <= 1) return 0;
  if ($n == 2) return 2;
  if ($n % 2 == 0) return 0;
  $d = $n - 1;
  $s = 0;
  while ($d % 2 == 0) {
    $d /= 2;
    $s += 1;
  }
  for ($i = 0; $i < 20; $i++) {
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
  $result = miller_rabin_primality_test($n);
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
