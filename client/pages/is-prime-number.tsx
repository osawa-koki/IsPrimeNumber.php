import React, { useState } from "react";

import { Button, Alert, Form, Tooltip, OverlayTrigger } from 'react-bootstrap';
import Layout from "../components/Layout";

import algorithms from "../src/algorithm";
import { Algo } from "../src/algorithm";

type Result = {
  algorithm: Algo;
  isPrime: -1 | 0 | 1 | 2;
};

export default function HelloWorld() {

  const [judging, setJudging] = useState(false);
  const [result, setResult] = useState<Result[]>(
    algorithms.map((algorithm) => ({
      algorithm,
      isPrime: -1,
    }))
  );

  return (
    <Layout>
      <main>
        <div id="IsPrimeNumber">
          <div id="IsPrimeHeader">
            <Form.Group id="IsPrimeInput">
              <Form.Label>Enter Number... 🐬🐬🐬</Form.Label>
              <Form.Control type="number" size="lg" min="0" />
            </Form.Group>
            <Button>判定 🦑</Button>
          </div>
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
                    <td>{result.isPrime}</td>
                    <td className={`isPrime-${result.isPrime}`}>
                      {result.isPrime === -1 ? "---" : result.isPrime === 0 ? "素数ではない" : result.isPrime === 1 ? "多分素数" : "絶対に素数"}
                    </td>
                  </tr>
                ))
              }
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </Layout>
  );
};
