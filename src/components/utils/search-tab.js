import React from "react";
import { Segment } from "semantic-ui-react";
import { SearchResults } from "../search-results";
import SearchForm from "../search-form";

function sortResults(a, b) {
  if (a.created < b.created) {
    return -1;
  } else {
    return 1;
  }
}

async function fetchResults(query, limit = 100) {
  if (query.length === 0) {
    return;
  }

  const requestUrl = `https://www.reddit.com/search.json?q=${encodeURIComponent(
    query
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

export class SearchTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: "",
      query: ""
    };

    this.onSubmitSearch = this.onSubmitSearch.bind(this);
    this.queryPrefix = "";
  }

  async onSubmitSearch({ query }) {
    const results = await fetchResults(this.queryPrefix + query);
    this.setState({ query, results });
  }

  render() {
    return (
      <div>
        <Segment>
          <SearchForm label={this.props.label} onSubmit={this.onSubmitSearch} />
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
