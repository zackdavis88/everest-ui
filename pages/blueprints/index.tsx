import { useState, useRef } from "react";
import Head from "next/head";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Collapse from "@material-ui/core/Collapse";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { GetServerSideProps } from "next";
import { connect } from "react-redux";
import { getAuthToken, requireAuth, isServerReq } from "../../src/utils";
import { RootState } from "../../src/store/store";
import { faSignInAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { authenticate } from "../../src/store/actions/auth";
import { useRouter } from "next/router";

interface BlueprintsIndexProps {
  initialReduxState?: RootState;
};

function BlueprintsIndex(props: BlueprintsIndexProps) {
  return (
    <>
      <Head>
        <title>Everest | Blueprints</title>
      </Head>
      Blueprints Page.
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  if(isServerReq(context.req)){
    const initialAuthProps = await getAuthToken(context);
    // Potentially fetch more data here, merge it all together and return it.
    return {props: {...initialAuthProps.props}};
  }
  return {props: {}};
};

const ConnectedBlueprintsIndex = connect(() => ({

}), {

})(BlueprintsIndex);

export default requireAuth(ConnectedBlueprintsIndex);
