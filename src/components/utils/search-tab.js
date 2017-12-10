import React from "react";
import { Segment } from "semantic-ui-react";
import { SearchResults } from "./search-results";
import SearchForm from "./search-form";

async function fetchResults(query, sort, nsfw, limit = 100) {
  if (query.length === 0) {
    return;
  }

  const encodedQuery = encodeURIComponent(`${query} nsfw:${nsfw}`);

  const requestUrl = `https://www.reddit.com/search.json?q=${encodedQuery}&limit=${limit}&sort=${sort}`;

  const response = await fetch(requestUrl, {
    method: "GET",
    headers: new Headers(),
    mode: "cors",
    cache: "default"
  });

  const json = await response.json();
  const results = json.data.children.map(child => child.data);

  return results;
}

export class SearchTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      query: ""
    };

    this.onSubmitSearch = this.onSubmitSearch.bind(this);
    this.sortResults = this.sortResults.bind(this);
    this.queryPrefix = "";
  }

  async onSubmitSearch({ query, sort, nsfw }) {
    const results = await fetchResults(this.queryPrefix + query, sort, nsfw);
    this.setState({ query, results });
  }

  sortResults(a, b) {
    if (a.created < b.created) {
      return -1;
    } else {
      return 1;
    }
  }

  get sortedResults() {
    return this.state.results.slice().sort(this.sortResults);
  }

  render() {
    return (
      <div>
        <Segment>
          <SearchForm label={this.props.label} onSubmit={this.onSubmitSearch} />
        </Segment>

        {this.state.results.length > 0 && (
          <Segment>
            <SearchResults results={this.sortedResults} />
          </Segment>
        )}
      </div>
    );
  }
}
