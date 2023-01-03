
type Algo = {
  name: string;
  api_name: string;
  description: string;
};

const algorithms: Algo[] = [
  {
    name: "Miller-Rabin primality test",
    api_name: "miller_rabin_primality_test",
    description: "ミラー＝ラビン素数判定法",
  },
  {
    name: "Fermat primality test",
    api_name: "fermat_primality_test",
    description: "フェルマーの小定理",
  },
  {
    name: "Solovey Shtrassen Test",
    api_name: "solovey_shtrassen_test",
    description: "ソロヴェイ・シュトラッセン素数判定法",
  },
];

export default algorithms;
export type { Algo };
