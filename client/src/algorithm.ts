
type Algo = {
  name: string;
  api_name: string;
  description: string;
};

const algorithms: Algo[] = [
  {
    name: "Miller-Rabin primality test",
    api_name: "miller_rabin_primality_test",
    description: "Miller-Rabin primality test",
  },
  {
    name: "Fermat primality test",
    api_name: "fermat_primality_test",
    description: "Fermat primality test",
  },
];

export default algorithms;
export type { Algo };
