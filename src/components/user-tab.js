import React from "react";
import { SearchTab } from "./utils/search-tab";
import UserProfile from "./utils/user-profile";
import { Segment } from "semantic-ui-react";
import { SearchResults } from "./utils/search-results";
import SearchForm from "./utils/search-form";

export class UserTab extends SearchTab {
  constructor(props) {
    super(props);
    this.queryPrefix = "author:";
  }

  sortResults(a, b) {
    if (a.created > b.created) {
      return -1;
    } else {
      return 1;
    }
  }

  render() {
    return (
      <div>
        <Segment>
          <SearchForm label={this.props.label} onSubmit={this.onSubmitSearch} />
        </Segment>

        {this.state.results.length > 0 && (
          <div>
            <Segment>
              <UserProfile userId={this.state.query} />
            </Segment>

            <Segment>
              <SearchResults results={this.sortedResults} />
            </Segment>
          </div>
        )}
      </div>
    );
  }
}
