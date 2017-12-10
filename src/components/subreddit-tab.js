import React from "react";
import { SearchTab } from "./utils/search-tab";

export class SubredditTab extends SearchTab {
  constructor(props) {
    super(props);
    this.queryPrefix = "subreddit:";
  }

  sortResults(a, b) {
    if (a.created > b.created) {
      return -1;
    } else {
      return 1;
    }
  }
}
