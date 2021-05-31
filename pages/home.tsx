import Head from "next/head";
import Container from "@material-ui/core/Container";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea"
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { GetServerSideProps } from "next";
import { getAuthToken, requireAuth } from "../src/utils";
import { RootState } from "../src/store/store";
import { faCubes, faCode, faTh, faLaptopCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

interface HomeProps {
  initialReduxState?: RootState;
};

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: "25px",
    padding: "16px"
  },
  box: {
    padding: "0 25px"
  },
  gridContainer: {
    margin: "25px 0 0 0",
    "& > div": {
      padding: "4px"
    },
    "& > div:first-of-type": {
      paddingLeft: "0"
    },
    "& > div:last-of-type": {
      paddingRight: "0"
    },
    [theme.breakpoints.only("sm")]: {
      "& > div:nth-of-type(2)": {
        paddingRight: "0"
      },
      "& > div:nth-of-type(3)": {
        paddingLeft: "0"
      }
    },
    [theme.breakpoints.only("xs")]: {
      "& > div": {
        padding: "4px 0"
      }
    }
  },
  card: {
    textAlign: "center"
  },
  cardInnerContainer: {
    padding: "25px",
    minHeight: "285px"
  },
  title: {
    fontWeight: "bold"
  },
  subtitle: {
    textAlign: "left",
    margin: "25px 0 0 0"
  }
}));

function Home(props: HomeProps) {
  const classes = useStyles();
  const appItems = [{
    icon: faCubes,
    title: "Blueprints",
    subtitle: "Define what the JSON structure of a component will look like.",
    url: "/blueprints/"
  }, {
    icon: faCode,
    title: "Components",
    subtitle: "Create a component which follows a blueprint.",
    url: "/components/"
  }, {
    icon: faTh,
    title: "Layouts",
    subtitle: "Place your components on a page.",
    url: "/layouts/"
  }, {
    icon: faLaptopCode,
    title: "Fragments",
    subtitle: "Create a JSON blob that can be fetched by your application.",
    url: "/fragments/"
  }];
  const renderCard = (item) => (
    <Card elevation={3} className={classes.card}>
      <Link href={item.url}>
        <CardActionArea component="a">
          <div className={classes.cardInnerContainer}>
            <FontAwesomeIcon icon={item.icon} size="7x" fixedWidth/>
            <Typography variant="h6" component="div" className={classes.title}>
              {item.title}
            </Typography>
            <Divider />
            <Typography variant="subtitle1" component="div" className={classes.subtitle}>
              {item.subtitle}
            </Typography>
          </div>
        </CardActionArea>
      </Link>
    </Card>
  );
  return (
    <>
      <Head>
        <title>Everest | Home</title>
      </Head>
      <Container maxWidth="lg" className={classes.container}>
        <Typography variant="h4" component="h4">
          I am looking for...
        </Typography>
        <Divider />
        <Grid container className={classes.gridContainer}>
          {appItems.map((item, index) => (
            <Grid item key={index} xs={12} sm={6} md={3} lg={3}>
              {renderCard(item)}
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = getAuthToken;

export default requireAuth(Home);
