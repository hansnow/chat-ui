import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { Main } from "@/components/main";
import { Provider } from "../components/context";

export default function Home() {
  return (
    <>
      <Head>
        <title>Galacean</title>
        <meta name="description" content="Chatbot for discovery" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Provider>
          <Main />
        </Provider>
      </main>
    </>
  );
}
