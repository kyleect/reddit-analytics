import React from "react";
import "./App.css";
import { Tab } from "semantic-ui-react";
import { LinkTab } from "./components/link-tab";
import { UserTab } from "./components/user-tab";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Tab
          panes={[
            {
              menuItem: "User",
              render: () => <UserTab />
            },
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
