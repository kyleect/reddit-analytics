import React from "react";
import "./App.css";
import { Tab, Header } from "semantic-ui-react";
import { LinkTab } from "./components/link-tab";
import { UserTab } from "./components/user-tab";
import { SelftextTab } from "./components/selftext-tab";
import { SubredditTab } from "./components/subreddit-tab";
import { SiteTab } from "./components/site-tab";
import { TitleTab } from "./components/title-tab";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header as="h1">reddit-analytics</Header>

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
            },
            {
              menuItem: "Subreddit",
              render: () => <SubredditTab />
            },
            {
              menuItem: "Site",
              render: () => <SiteTab />
            },
            {
              menuItem: "Title",
              render: () => <TitleTab />
            }
          ]}
        />
      </div>
    );
  }
}

export default App;
