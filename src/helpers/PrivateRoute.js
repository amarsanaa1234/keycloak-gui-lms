import {useKeycloak} from "keycloak-react-web";


const PrivateRoute = ({ children }) => {
    const { keycloak } = useKeycloak();

    const isLoggedIn = keycloak.authenticated;

    return isLoggedIn ? children : null;
};

export default PrivateRoute;
