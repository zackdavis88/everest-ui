import Head from "next/head";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { initializeStore } from "../src/store/store";
import { connect } from "react-redux";
import { getAuthToken } from "../src/utils";

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

// export const getServerSideProps: GetServerSideProps = async context => {
//   if(isServerReq(context.req)){
//     const reduxStore = initializeStore();
//     await reduxStore.dispatch({
//       type: "DEBUG"
//     });
//     return {
//       props: {
//         initialReduxState: reduxStore.getState()
//       }
//     };
//   }
//   return {props: {}};
// };
export const getServerSideProps: GetServerSideProps = getAuthToken;


export default connect((state) => ({
  auth: state["auth"]
}), {})(Index);
