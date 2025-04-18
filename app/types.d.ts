interface Window {
  ethereum?: any;
}

declare module 'ethers' {
  export class BrowserProvider {
    constructor(ethereum: any);
    getNetwork(): Promise<{ name: string; chainId: bigint }>;
    listAccounts(): Promise<{ address: string }[]>;
    send(method: string, params: any[]): Promise<any>;
    getSigner(): Promise<any>;
  }

  export class Contract {
    constructor(address: string, abi: any[], signerOrProvider: any);
    mint(count: number, options: { value: bigint }): Promise<{ hash: string; wait(): Promise<any> }>;
  }

  export function parseEther(value: string): bigint;
} 