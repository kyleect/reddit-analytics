import React from "react";
import { SearchTab } from "./utils/search-tab";

export class SelftextTab extends SearchTab {
  constructor(props) {
    super(props);
    this.queryPrefix = "selftext:";
  }

  sortResults(a, b) {
    if (a.created > b.created) {
      return -1;
    } else {
      return 1;
    }
  }
}
