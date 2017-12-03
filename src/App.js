import React, { Component } from "react";
import "./App.css";
import {
  Item,
  Button,
  Input,
  Segment,
  Statistic,
  List,
  Icon,
  Tab
} from "semantic-ui-react";
import { ControlForm } from "./components/utils/control-form";
import moment from "moment";

class App extends Component {
  static sortResults = (a, b) => {
    if (a.created < b.created) {
      return -1;
    } else {
      return 1;
    }

    return 0;
  };

  constructor(props) {
    super(props);
    this.state = {
      results: "",
      url: ""
    };

    this.fetchResults = this.fetchResults.bind(this);
  }

  async fetchResults({ url }, limit = 100) {
    if (url.length === 0) {
      return;
    }

    this.setState({ url });

    const requestUrl = `https://www.reddit.com/search.json?q=url:${url}&limit=${
      limit
    }`;

    const response = await fetch(requestUrl, {
      method: "GET",
      headers: new Headers(),
      mode: "cors",
      cache: "default"
    });

    const json = await response.json();
    const results = json.data.children.map(child => child.data);
    const sortedResults = results.slice().sort(App.sortResults);
    this.setState({ results: sortedResults });
  }

  get scoreTotal() {
    return this.state.results.reduce(
      (total, result) => total + result.score,
      0
    );
  }

  get commentsTotal() {
    return this.state.results.reduce(
      (total, result) => total + result.num_comments,
      0
    );
  }

  render() {
    return (
      <div className="App">
        <Tab
          panes={[
            {
              menuItem: "Link",
              render: () => (
                <div>
                  <Segment>
                    <ControlForm
                      initialState={{ url: "" }}
                      onSubmit={this.fetchResults}
                    >
                      {({ onChange, value, state }) => (
                        <div>
                          <Input
                            type="text"
                            id="url"
                            label="Url"
                            action="Search"
                            onChange={onChange("url")}
                            value={value("url")}
                            style={{ width: "100%" }}
                          />
                        </div>
                      )}
                    </ControlForm>
                  </Segment>

                  {this.state.results && (
                    <Segment>
                      <Item.Group divided>
                        {this.state.results.map((result, i, arr) => (
                          <Item key={i}>
                            {result.thumbnail !== "default" && (
                              <Item.Image src={result.thumbnail} size="tiny" />
                            )}
                            <Item.Content>
                              <Item.Header>{result.title}</Item.Header>
                              <Item.Meta>
                                <List>
                                  {i === 0 && (
                                    <List.Item>
                                      <Icon name="trophy" color="yellow" />
                                      {"Original Post"}
                                    </List.Item>
                                  )}
                                  <List.Item>
                                    <Icon name="calendar" />
                                    {`${moment
                                      .unix(result.created_utc)
                                      .format(
                                        "YYYY-MM-DD @ h:mm:ss a"
                                      )} - ${moment
                                      .unix(result.created_utc)
                                      .fromNow()}`}
                                  </List.Item>
                                  {i > 0 && (
                                    <List.Item>
                                      <Icon name="time" />
                                      {`${moment
                                        .duration(
                                          moment
                                            .unix(result.created_utc)
                                            .diff(
                                              moment.unix(
                                                arr[i - 1].created_utc
                                              )
                                            )
                                        )
                                        .humanize()} later`}
                                    </List.Item>
                                  )}
                                  {i > 0 && (
                                    <List.Item>
                                      <Icon name="time" />
                                      {`${moment
                                        .duration(
                                          moment
                                            .unix(result.created_utc)
                                            .diff(
                                              moment.unix(arr[0].created_utc)
                                            )
                                        )
                                        .humanize()} from original post`}
                                    </List.Item>
                                  )}
                                  <List.Item>
                                    <Icon name="reddit" /> r/{result.subreddit}
                                  </List.Item>
                                  <List.Item>
                                    <Icon name="user" />
                                    {result.author}
                                  </List.Item>
                                  <List.Item>
                                    <Icon name="arrow up" />
                                    {result.score}
                                  </List.Item>
                                  <List.Item>
                                    <Icon name="comments" />
                                    {result.num_comments}
                                  </List.Item>
                                  {i === 0 && (
                                    <div>
                                      <Statistic>
                                        <Statistic.Value>
                                          {this.state.results.length - 1}
                                        </Statistic.Value>
                                        <Statistic.Label>
                                          Reposts
                                        </Statistic.Label>
                                      </Statistic>

                                      <Statistic>
                                        <Statistic.Value>
                                          {this.scoreTotal}
                                        </Statistic.Value>
                                        <Statistic.Label>
                                          Total Score
                                        </Statistic.Label>
                                      </Statistic>

                                      <Statistic>
                                        <Statistic.Value>
                                          {this.commentsTotal}
                                        </Statistic.Value>
                                        <Statistic.Label>
                                          Total Comments
                                        </Statistic.Label>
                                      </Statistic>
                                    </div>
                                  )}
                                </List>
                              </Item.Meta>
                            </Item.Content>
                          </Item>
                        ))}
                      </Item.Group>
                    </Segment>
                  )}
                </div>
              )
            }
          ]}
        />
      </div>
    );
  }
}

export default App;
