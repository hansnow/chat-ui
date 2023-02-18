import Head from "next/head";
import styles from "@/styles/Home.module.css";

import { Chatbot } from "../components";

export default function Home() {
  return (
    <>
      <Head>
        <title>Chatbot</title>
        <meta name="description" content="Chatbot for discovery" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Chatbot />
      </main>
    </>
  );
}
