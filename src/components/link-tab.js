import React from "react";
import { SearchTab } from "./utils/search-tab";

export class LinkTab extends SearchTab {
  constructor(props) {
    super(props);
    this.queryPrefix = "url:";
  }
}
