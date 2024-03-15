const {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL,
} = require("@solana/web3.js");

const wallet = new Keypair();

const publicKey = wallet.publicKey;
const secretKey = wallet.secretKey;

console.log(publicKey);
console.log(secretKey);

const getWalletBalance = async () => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const walletBalance = await connection.getBalance(publicKey);
    console.log(`Wallet balance is ${walletBalance}`);
  } catch (error) {
    console.log(error);
  }
};

const airDropSol = async () => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const airdropSignature = await connection.requestAirdrop(
      publicKey,
      2 * LAMPORTS_PER_SOL
    );
    const latestBlockHash = await connection.getLatestBlockhash();

    await connection.confirmTransaction({
      blockhash: latestBlockHash.blockhash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      signature: airdropSignature,
    });
  } catch (error) {
    console.log(error);
  }
};

const main = async () => {
  await getWalletBalance();
  await airDropSol();
  await getWalletBalance();
};

main();
