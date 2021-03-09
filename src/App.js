import "bootstrap/dist/css/bootstrap.min.css";
import 'antd/dist/antd.css';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";

import ContributionDetailsPage from "./pages/ContributionDetailsPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={HomePage}/>
        <Route path="/contribution-details/:contributionID" exact component={ContributionDetailsPage}/>
      </Router>
    </div>
  );
}

export default App;
