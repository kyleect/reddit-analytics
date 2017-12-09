import React from "react";
import "./App.css";
import { Tab } from "semantic-ui-react";
import { LinkTab } from "./components/link-tab";
import { UserTab } from "./components/user-tab";
import { SelftextTab } from "./components/selftext-tab";

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
            },
            {
              menuItem: "Self Text",
              render: () => <SelftextTab />
            }
          ]}
        />
      </div>
    );
  }
}

export default App;
