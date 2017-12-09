import React from "react";
import { ControlForm } from "./utils/control-form";
import moment from "moment";
import { Segment } from "semantic-ui-react";
import { SearchResults } from "./search-results";
import SearchForm from "./search-form";
import { SearchTab } from "./utils/search-tab";

export class SelftextTab extends SearchTab {
  constructor(props) {
    super(props);
    this.queryPrefix = "selftext:";
  }
}
