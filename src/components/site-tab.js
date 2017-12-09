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

async function fetchResults(site, limit = 100) {
  if (site.length === 0) {
    return;
  }

  const requestUrl = `https://www.reddit.com/search.json?q=${encodeURIComponent(
    `site:${site}`
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

export class SiteTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: "",
      site: ""
    };

    this.onSubmitSiteSearch = this.onSubmitSiteSearch.bind(this);
  }

  async onSubmitSiteSearch(site) {
    const results = await fetchResults(site);
    this.setState({ site, results });
  }

  render() {
    return (
      <div>
        <Segment>
          <SearchForm label="Site" onSubmit={this.onSubmitSiteSearch} />
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
