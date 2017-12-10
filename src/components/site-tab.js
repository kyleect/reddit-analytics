import React from "react";
import { ControlForm } from "./utils/control-form";
import moment from "moment";
import { Segment } from "semantic-ui-react";
import { SearchResults } from "./search-results";
import { SearchTab } from "./utils/search-tab";

export class SiteTab extends SearchTab {
  constructor(props) {
    super(props);
    this.queryPrefix = "site:";
  }

  sortResults(a, b) {
    if (a.created > b.created) {
      return -1;
    } else {
      return 1;
    }
  }
}
