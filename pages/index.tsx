import Head from "next/head";
import { GetServerSideProps } from "next";
import { initializeStore } from "../src/store/store";

export const getServerSideProps: GetServerSideProps = async context => {
  const reduxStore = initializeStore();

  return {
    props: {
      initialReduxState: reduxStore.getState()
    }
  };
};

export default function Home(props) {
  return (
    <>
      <Head>
        <title>Index Page</title>
      </Head>
      <div>
        Hello, World!
      </div>
    </>
  );
};
