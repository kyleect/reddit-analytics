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

async function fetchResults(text, limit = 100) {
  if (text.length === 0) {
    return;
  }

  const requestUrl = `https://www.reddit.com/search.json?q=${encodeURIComponent(
    `selftext:${text}`
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

export class SelftextTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: "",
      text: ""
    };

    this.onSubmitTextSearch = this.onSubmitTextSearch.bind(this);
  }

  async onSubmitTextSearch(text) {
    const results = await fetchResults(text);
    this.setState({ text, results });
  }

  render() {
    return (
      <div>
        <Segment>
          <SearchForm label="Self Text" onSubmit={this.onSubmitTextSearch} />
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
