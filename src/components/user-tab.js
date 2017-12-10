import React from "react";
import { ControlForm } from "./utils/control-form";
import moment from "moment";
import { Segment } from "semantic-ui-react";
import { SearchResults } from "./search-results";
import SearchForm from "./search-form";
import { SearchTab } from "./utils/search-tab";

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
}
