import React from "react";
import { Segment } from "semantic-ui-react";
import { SearchResults } from "./search-results";
import SearchForm from "./search-form";
import { SearchTab } from "./utils/search-tab";

export class LinkTab extends SearchTab {
  constructor(props) {
    super(props);
    this.queryPrefix = "url:";
  }

  render() {
    return (
      <div>
        <Segment>
          <SearchForm label="Link" onSubmit={this.onSubmitSearch} />
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
