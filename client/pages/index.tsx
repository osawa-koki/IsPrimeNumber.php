import Link from "next/link";
import Layout from "../components/Layout";
import { Button } from 'react-bootstrap';

export default function Home() {
  return (
    <Layout>
      <div id='Index'>
        <h1>Hello IsPrimeNumber 💓💓💓</h1>
        <img id='Logo' src="./tako.png" alt="Logo" />
        <Link href="is-prime-number">
          <Button>🐙 素数かどうかを判定する 🐙</Button>
        </Link>
      </div>
    </Layout>
  );
};
