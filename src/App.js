import React, { Component } from "react";
import "./App.css";
import { Tab } from "semantic-ui-react";
import { LinkTab } from "./components/link-tab";

class App extends Component {
  static sortResults = (a, b) => {
    if (a.created < b.created) {
      return -1;
    } else {
      return 1;
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      results: "",
      url: ""
    };
  }

  render() {
    return (
      <div className="App">
        <Tab
          panes={[
            {
              menuItem: "Link",
              render: () => <LinkTab />
            }
          ]}
        />
      </div>
    );
  }
}

export default App;
