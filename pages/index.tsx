import Head from "next/head";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { connect } from "react-redux";
import { getAuthToken } from "../src/utils";
import { RootState } from "../src/store/store";

function Index(props) {
  return (
    <>
      <Head>
        <title>Index Page</title>
      </Head>
      <div>
        Hello, World!
        <br/>
        <Link href="/page2">
          <a>Page2</a>
        </Link>
      </div>
      <div>
        {JSON.stringify(props.auth)}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = getAuthToken;

export default connect((state: RootState) => ({
  auth: state.auth
}), {})(Index);
