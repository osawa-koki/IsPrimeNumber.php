import React, { useState } from "react";

import { Button, Alert, Form, Tooltip, OverlayTrigger, Spinner } from 'react-bootstrap';
import Layout from "../components/Layout";

import algorithms from "../src/algorithm";
import { Algo } from "../src/algorithm";

type Result = {
  algorithm: Algo;
  isPrime: -1 | 0 | 1 | 2;
};

const initResult = algorithms.map((algorithm) => ({
  algorithm,
  isPrime: -1,
} as Result));

export default function HelloWorld() {

  const [summary, setSummary] = useState(-1);
  const [onprogress, setOnprogress] = useState<string[]>([]);
  const [number, setNumber] = useState(Math.floor(Math.random() * 100000000));
  const [result, setResult] = useState<Result[]>(initResult);
  const [error, setError] = useState<string | null>(null);

  const judge = async () => {
    try {
      setSummary(-1);
      algorithms.forEach((algorithm) => {
        setOnprogress([...onprogress, algorithm.name]);
      });
      await new Promise((resolve) => setTimeout(resolve, 100));
      algorithms.forEach((algorithm) => {
        const n = number;
        fetch(`/api/${algorithm.api_name}.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ number: n }),
        })
        .then((res) => res.json())
        .then((res) => {
          if (n !== number) return; // 時間が経過してキャンセルされたと推定。
          const _result = [...result];
          _result.find((r) => r.algorithm.name === algorithm.name)!.isPrime = res.result;
          setResult(_result);
          setOnprogress(onprogress.filter((name) => name !== algorithm.name));
        });
      });
      fetch(`/api/gmp_prob_prime.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          },
          body: JSON.stringify({ number }),
        })
        .then((res) => res.json())
        .then((res) => {
          setSummary(res.result);
        }
      );
    } catch (e) {
      setError('素数判定中にエラーが発生しました。');
    }
  };

  return (
    <Layout>
      <main>
        <div id="IsPrimeNumber">
          <div id="IsPrimeHeader">
            <Form.Group id="IsPrimeInput">
              <Form.Label>Enter Number... 🐬🐬🐬</Form.Label>
              <Form.Control type="number" size="lg" min="0" value={number} onInput={(e) => {setSummary(-1); setResult(initResult); setNumber(parseInt((e.target as HTMLInputElement).value))}} />
            </Form.Group>
            <Button disabled={onprogress.length !== 0} onClick={judge}>
              {onprogress.length === 0 ? <>判定 🦑</> : <><Spinner animation="border" variant="light" size="sm" /></>}
            </Button>
          </div>
          {
            summary !== -1 &&
            <>
              <div id="IsPrimeSummary">
                <Alert variant='info'>
                  "{number}"は{summary === 0 ? "素数ではない" : summary === 1 ? "多分素数" : "絶対に素数"}です
                  {summary === 0 ? "🐬🐬🐬" : summary === 1 ? "🐵🐵🐵" : "🐙🐙🐙"}
                </Alert>
              </div>
            </>
          }
          <div id="IsPrimeResult">
            <table>
              <tbody>
              {
                result.map((result) => (
                  <tr key={result.algorithm.name}>
                    <td>
                      <OverlayTrigger
                        placement="left"
                        delay={{ show: 100, hide: 500 }}
                        overlay={<Tooltip>{result.algorithm.description}</Tooltip>}
                      >
                        <div className="AlgoName">{result.algorithm.name}</div>
                      </OverlayTrigger>
                    </td>
                    <td className={`isPrime-${result.isPrime}`}>
                      {result.isPrime === -1 ? "---" : result.isPrime === 0 ? "素数ではない" : result.isPrime === 1 ? "多分素数" : "絶対に素数"}
                    </td>
                  </tr>
                ))
              }
              </tbody>
            </table>
          </div>
          {
            error &&
            <Alert id="Error" variant='danger'>
              {error}
            </Alert>
          }
        </div>
      </main>
    </Layout>
  );
};
