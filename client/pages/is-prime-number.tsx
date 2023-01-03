import React, { useState } from "react";

import { Button, Alert, Form } from 'react-bootstrap';
import Layout from "../components/Layout";

import PageBlock from "../components/pages";

const mail_regex = new RegExp(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/);

export default function HelloWorld() {

  let [count, setCount] = useState(0);
  let [mail, setMail] = useState('osawa-koki@example.com');

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
        </div>
      </main>
    </Layout>
  );
};
