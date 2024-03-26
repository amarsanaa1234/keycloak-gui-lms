import { Layout, message, Modal } from "antd";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import contextLogin from "../components/contextLogin";
import contextKeycloak from "./contextKeycloak";
import ShowMessage from "../tools/ShowMessage";
import Homepage from "../pages/Homepage";

const MainLogin = () => {
    const {
      keycloakToken,
      setLoggedUser,
      reLoadUser,
      setReLoadUser,
      setIsUserRequest,
      exceptionMessage
    } = React.useContext(contextLogin);
    const { logoutUser } = React.useContext(contextKeycloak);
    const [loading, setLoading] = React.useState(true);


    React.useEffect(() => {
      if (keycloakToken) ;
      else setLoading(false);
    }, [keycloakToken]);

    return (
      <>
        <Layout theme="light" style={{ height: "100%" }}>
          {exceptionMessage &&
            <ShowMessage exceptionCode={exceptionMessage.code} exceptionType={exceptionMessage.type}
                         render={exceptionMessage.render} />
          }
          <Router>
            <Layout.Header style={{ backgroundColor: "white", zIndex: 10 }}>
              {/*<MainHeader*/}
              {/*  userLoading={loading}*/}
              {/*  logoutSession={() => logoutSession()}*/}
              {/*/>*/}
            </Layout.Header>
              {loading ? <p>s</p> : <Homepage />}
          </Router>
        </Layout>
      </>
    );
  }
;

MainLogin.propTypes = {};

export default MainLogin;
