import Head from "next/head";
import Link from "next/link";
import { initializeStore, RootState } from "../src/store/store";
import { connect } from "react-redux";
import { GetServerSideProps } from "next";
import { isServerReq } from "../src/utils";

function Page2(props) {
  return (
    <>
      <Head>
        <title>Page 2</title>
      </Head>
      <div>
        Page2
        <br />
        <Link href="/">
          <a>Index</a>
        </Link>
      </div>
      <div>
        {JSON.stringify(props.auth)}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  if(isServerReq(context.req)){
    const reduxStore = initializeStore();
    return {
      props: {
        initialReduxState: reduxStore.getState()
      }
    };
  }
  return {props: {}};
};

export default connect((state: RootState) => ({
  auth: state.auth
}), {

})(Page2);
