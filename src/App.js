import React, { Component } from "react";
import "./App.css";
import { Tab, Segment } from "semantic-ui-react";
import { ControlForm } from "./components/utils/control-form";

import { UrlSearchForm } from "./components/url-search-form";
import { UrlSearchResults } from "./components/url-search-results";

class App extends Component {
  static sortResults = (a, b) => {
    if (a.created < b.created) {
      return -1;
    } else {
      return 1;
    }

    return 0;
  };

  constructor(props) {
    super(props);
    this.state = {
      results: "",
      url: ""
    };

    this.fetchResults = this.fetchResults.bind(this);
  }

  async fetchResults({ url }, limit = 100) {
    if (url.length === 0) {
      return;
    }

    this.setState({ url });

    const requestUrl = `https://www.reddit.com/search.json?q=url:${url}&limit=${
      limit
    }`;

    const response = await fetch(requestUrl, {
      method: "GET",
      headers: new Headers(),
      mode: "cors",
      cache: "default"
    });

    const json = await response.json();
    const results = json.data.children.map(child => child.data);
    const sortedResults = results.slice().sort(App.sortResults);
    this.setState({ results: sortedResults });
  }

  render() {
    return (
      <div className="App">
        <Tab
          panes={[
            {
              menuItem: "Link",
              render: () => (
                <div>
                  <Segment>
                    <UrlSearchForm onSubmit={this.fetchResults} />
                  </Segment>

                  {this.state.results && (
                    <Segment>
                      <UrlSearchResults results={this.state.results} />
                    </Segment>
                  )}
                </div>
              )
            }
          ]}
        />
      </div>
    );
  }
}

export default App;
