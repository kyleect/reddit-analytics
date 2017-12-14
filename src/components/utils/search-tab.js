import React from "react";
import { Segment, List } from "semantic-ui-react";
import { SearchResults } from "./search-results";
import SearchForm from "./search-form";

async function fetchResults(query, sort, nsfw, limit = 100) {
  if (query.length === 0) {
    return;
  }

  const encodedQuery = encodeURIComponent(
    `${query} nsfw:${nsfw ? "yes" : "no"}`
  );

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
    try {
      const results = await fetchResults(this.queryPrefix + query, sort, nsfw);
      this.setState({ query, sort, nsfw, results });
    } catch (e) {
      this.setState({ query, sort, nsfw, results: [], error: e });
    }
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

  renderBeforeResults() {
    return null;
  }

  renderAfterResults() {
    return null;
  }

  render() {
    return (
      <div>
        <Segment>
          <SearchForm label={this.props.label} onSubmit={this.onSubmitSearch} />
        </Segment>

        {this.state.query.length > 0 && (
          <Segment>
            <List>
              <List.Item>Query: {this.state.query}</List.Item>
              <List.Item>Sort: {this.state.sort}</List.Item>
              <List.Item>NSFW: {this.state.nsfw ? "Yes" : "No"}</List.Item>
              {this.state.error && (
                <List.Item>Error: {this.state.error.message}</List.Item>
              )}
            </List>
          </Segment>
        )}

        {this.state.results.length > 0 && (
          <Segment>
            {this.renderBeforeResults()}
            <SearchResults results={this.sortedResults} />
            {this.renderAfterResults()}
          </Segment>
        )}
      </div>
    );
  }
}
