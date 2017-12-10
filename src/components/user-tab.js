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

  renderBeforeResults() {
    return <UserProfile userId={this.state.query} />;
  }
}
