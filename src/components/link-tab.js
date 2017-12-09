import React from "react";
import { Segment } from "semantic-ui-react";
import { SearchResults } from "./search-results";
import SearchForm from "./search-form";

function sortResults(a, b) {
  if (a.created < b.created) {
    return -1;
  } else {
    return 1;
  }
}

async function fetchResults(url, limit = 100) {
  if (url.length === 0) {
    return;
  }

  const requestUrl = `https://www.reddit.com/search.json?q=url:${encodeURIComponent(
    url
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

export class LinkTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: "",
      url: ""
    };

    this.onSubmitUrlSearch = this.onSubmitUrlSearch.bind(this);
  }

  async onSubmitUrlSearch(url) {
    const results = await fetchResults(url);
    this.setState({ url, results });
  }

  render() {
    return (
      <div>
        <Segment>
          <SearchForm label="Link" onSubmit={this.onSubmitUrlSearch} />
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
