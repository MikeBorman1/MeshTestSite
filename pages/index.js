import Head from "next/head";
import { CardanoWallet, MeshBadge } from "@meshsdk/react";
import React from "react";
import { useWallet } from '@meshsdk/react';

export default function Home() {
  const { connected, wallet } = useWallet();
  const [networkId, setNetworkId] = React.useState(null);
  const [assets, setAssets] = React.useState(null);

  const getNetworkId = async () => {
    const networkId = await wallet.getNetworkId();
    setNetworkId(networkId);
  };

  const getAssets = async () => {
    const assets = await wallet.getBalance();
    setAssets(assets);
  };

  React.useEffect(() => {
    if (connected) {
      getNetworkId();
      getAssets();
    }
  }, [connected]);

  return (
    <div className="container">
      <Head>
        <title>Mesh App on Cardano</title>
        <meta name="description" content="A Cardano dApp powered my Mesh" />
        <link
          rel="icon"
          href="https://meshjs.dev/favicon/favicon-32x32.png"
        />
        <link
          href="https://meshjs.dev/css/template.css"
          rel="stylesheet"
          key="mesh-demo"
        />
      </Head>

      <main className="main">
        <h1 className="title">
          <a href="https://meshjs.dev/">Mesh</a> Next.js
        </h1>

        <div className="demo">
          <CardanoWallet  />
        </div>
        {connected &&
          <a><p>Connected wallet network id: {networkId}</p>
          <pre>
              <code className="language-js">
                {JSON.stringify(assets, null, 2)}
              </code>
            </pre>
          </a>}
      </main>

      <footer className="footer">
        <MeshBadge dark={true} />
      </footer>
    </div>
  );
}

