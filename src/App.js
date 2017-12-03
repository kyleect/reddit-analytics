import React, { Component } from "react";
import "./App.css";
import {
  Item,
  Button,
  Input,
  Segment,
  Statistic,
  List,
  Icon
} from "semantic-ui-react";
import { ControlForm } from "./components/utils/control-form";
import moment from "moment";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: "",
      url: ""
    };

    this.setSearchResults = this.setSearchResults.bind(this);
  }

  setSearchResults({ url }) {
    this.setState({ url });
    fetch(`https://www.reddit.com/search.json?q=url:${url}`, {
      method: "GET",
      headers: new Headers(),
      mode: "cors",
      cache: "default"
    })
      .then(res => res.json())
      .then(json => json.data.children)
      .then(children => children.map(child => child.data))
      .then(results =>
        results.slice().sort((a, b) => {
          if (a.created < b.created) {
            return -1;
          } else {
            return 1;
          }

          return 0;
        })
      )
      .then(results => this.setState({ results }))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="App">
        <ControlForm
          initialState={{ url: "" }}
          onSubmit={this.setSearchResults}
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

        {this.state.results && (
          <Segment>
            <Statistic>
              <Statistic.Value>{this.state.results.length}</Statistic.Value>
              <Statistic.Label>Reposts</Statistic.Label>
            </Statistic>

            <Item.Group divided>
              {this.state.results.map(result => (
                <Item>
                  {result.thumbnail !== "default" && (
                    <Item.Image src={result.thumbnail} size="tiny" />
                  )}
                  <Item.Content>
                    <Item.Header>{result.title}</Item.Header>
                    <Item.Meta>
                      <List>
                        <List.Item>
                          <Icon name="reddit" /> r/{result.subreddit}
                        </List.Item>
                        <List.Item>
                          <Icon name="user" />
                          {result.author}
                        </List.Item>
                        <List.Item>
                          <Icon name="calendar" />
                          {moment.unix(result.created_utc).fromNow()}
                        </List.Item>
                      </List>
                    </Item.Meta>
                  </Item.Content>
                </Item>
              ))}
            </Item.Group>
          </Segment>
        )}
      </div>
    );
  }
}

export default App;
