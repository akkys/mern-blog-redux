import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./store";
import "./main.scss";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/pages/Home";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/pages/Dashboard";
import PrivateRoute from "./private/PrivateRoute";
import RouteLinks from "./private/RouteLinks";
import PageNotFound from "./components/pages/PageNotFound";
import CreateBlog from "./components/blog/CreateBlog";
import UpdateBlog from "./components/blog/UpdateBlog";
import UpdateImage from "./components/blog/UpdateImage";
import UpdateName from "./components/userAuth/UpdateName";
import UpdatePassword from "./components/userAuth/UpdatePassword";
import BlogDetails from "./components/blog/BlogDetails";

function App() {
  return (
    <Provider store={Store}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home/:page" component={Home} />
          <Route exact path="/blogDetails/:id" component={BlogDetails} />
          <RouteLinks exact path="/register" component={Register} />
          <RouteLinks exact path="/login" component={Login} />
          <PrivateRoute exact path="/dashboard/:page?" component={Dashboard} />
          <PrivateRoute exact path="/createBlog" component={CreateBlog} />
          <PrivateRoute exact path="/updateBlog/:id" component={UpdateBlog} />
          <PrivateRoute exact path="/updateImage/:id" component={UpdateImage} />
          <PrivateRoute exact path="/updateName" component={UpdateName} />
          <PrivateRoute
            exact
            path="/updatePassword"
            component={UpdatePassword}
          />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
