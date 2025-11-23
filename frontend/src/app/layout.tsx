import type { Metadata } from "next";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import "@/src/index.css";

export const metadata: Metadata = {
  title: "Web3 Message Signer & Verifier",
  description: "Sign messages and verify signatures with your wallet",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const environmentId = process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID;

  if (!environmentId) {
    return (
      <html lang="en">
        <body>
          <div className="error">
            <h1>Configuration Error</h1>
            <p>
              Please set NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID in your .env.local
              file
            </p>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body>
        <DynamicContextProvider
          settings={{
            environmentId,
            walletConnectors: [EthereumWalletConnectors],
          }}
        >
          {children}
        </DynamicContextProvider>
      </body>
    </html>
  );
}
