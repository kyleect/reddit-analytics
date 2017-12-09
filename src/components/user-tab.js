import React from "react";
import { ControlForm } from "./utils/control-form";
import moment from "moment";
import { Segment } from "semantic-ui-react";
import { SearchResults } from "./search-results";
import SearchForm from "./search-form";

function sortResults(a, b) {
  if (a.created > b.created) {
    return -1;
  } else {
    return 1;
  }
}

async function fetchResults(user, limit = 100) {
  if (user.length === 0) {
    return;
  }

  const requestUrl = `https://www.reddit.com/search.json?q=${encodeURIComponent(
    `author:${user}`
  )}&limit=${limit}`;

  const response = await fetch(requestUrl, {
    method: "GET",
    headers: new Headers(),
    mode: "cors",
    cache: "default"
  });

  const json = await response.json();
  const results = json.data.children.map(child => child.data);
  const sortedResults = results.slice().sort(sortResults);

  return sortedResults;
}

export class UserTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: "",
      user: ""
    };

    this.onSubmitUserSearch = this.onSubmitUserSearch.bind(this);
  }

  async onSubmitUserSearch({ user }) {
    const results = await fetchResults(user);
    this.setState({ user, results });
  }

  render() {
    return (
      <div>
        <Segment>
          <SearchForm label="User" onSubmit={this.onSubmitUserSearch} />
        </Segment>

        {this.state.results && (
          <Segment>
            <SearchResults results={this.state.results} />
          </Segment>
        )}
      </div>
    );
  }
}
