import Head from "next/head";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async context => {
  return {
    props: {}
  };
};

export default function Home(props) {
  return (
    <div>
      Hello, World!
    </div>
  );
};
