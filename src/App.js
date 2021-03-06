import './App.css';
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Contacts from './components/Contact';
import Signup from "./components/Signup";
import { AuthProvider } from "./contexts/AuthContext";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import EditProfile from "./components/EditProfile";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword";
function App() {
  return (
    
    <Container  className="d-flex align-items-center justify-content-center" style={{minHeight:'100vh'}}>
      <div className="w-100" style={{maxWidth:"400px"}}>
      <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/contacts" component={Contacts} />
          <PrivateRoute path="/update-profile" component={EditProfile} />
          <Route path="/forgot-password" component={ForgotPassword} />
        </Switch>
        </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
