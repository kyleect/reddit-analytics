import React from "react";
import { ControlForm } from "./utils/control-form";
import moment from "moment";
import {
  Segment,
  Item,
  List,
  Icon,
  Divider,
  Statistic,
  Input
} from "semantic-ui-react";

const UrlSearchForm = ({ onSubmit }) => (
  <ControlForm initialState={{ url: "" }} onSubmit={onSubmit}>
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
);

const UrlSearchResults = ({ results }) => {
  const scoreTotal = results.reduce((total, result) => total + result.score, 0);

  const commentsTotal = results.reduce(
    (total, result) => total + result.num_comments,
    0
  );

  return (
    <Item.Group divided>
      {results.map((result, i, arr) => (
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
                  <Icon name="reddit" /> r/{result.subreddit}
                </List.Item>
                <List.Item>
                  <Icon name="user" />
                  {result.author}
                </List.Item>
                <List.Item>
                  <Icon name="calendar" />
                  {`${moment
                    .unix(result.created_utc)
                    .format("YYYY-MM-DD @ h:mm:ss a")} - ${moment
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
                          .diff(moment.unix(arr[i - 1].created_utc))
                      )
                      .humanize()} from last post`}
                  </List.Item>
                )}
                {i > 0 && (
                  <List.Item>
                    <Icon name="time" />
                    {`${moment
                      .duration(
                        moment
                          .unix(result.created_utc)
                          .diff(moment.unix(arr[0].created_utc))
                      )
                      .humanize()} from original post`}
                  </List.Item>
                )}
                <List.Item>
                  <Icon name="arrow up" />
                  {`${result.score} score`}
                </List.Item>
                <List.Item>
                  <Icon name="comments" />
                  {`${result.num_comments} comment/s`}
                </List.Item>
                {i === 0 && (
                  <div>
                    <Divider />

                    <Statistic>
                      <Statistic.Value>{scoreTotal}</Statistic.Value>
                      <Statistic.Label>Total Score</Statistic.Label>
                    </Statistic>

                    <Statistic>
                      <Statistic.Value>{commentsTotal}</Statistic.Value>
                      <Statistic.Label>Total Comment/s</Statistic.Label>
                    </Statistic>

                    <Statistic>
                      <Statistic.Value>{results.length - 1}</Statistic.Value>
                      <Statistic.Label>Repost/s</Statistic.Label>
                    </Statistic>
                  </div>
                )}
              </List>
            </Item.Meta>
          </Item.Content>
        </Item>
      ))}
    </Item.Group>
  );
};

function sortResults(a, b) {
  if (a.created < b.created) {
    return -1;
  } else {
    return 1;
  }
}

async function fetchResults(url, limit = 100) {
  if (url.length === 0) {
    return;
  }

  const requestUrl = `https://www.reddit.com/search.json?q=url:${encodeURIComponent(
    url
  )}&limit=${limit}`;

  const response = await fetch(requestUrl, {
    method: "GET",
    headers: new Headers(),
    mode: "cors",
    cache: "default"
  });

  const json = await response.json();
  const results = json.data.children.map(child => child.data);
  const sortedResults = results.slice().sort(sortResults);

  return sortedResults;
}

export class LinkTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: "",
      url: ""
    };

    this.onSubmitUrlSearch = this.onSubmitUrlSearch.bind(this);
  }

  async onSubmitUrlSearch({ url }) {
    const results = await fetchResults(url);
    this.setState({ url, results });
  }

  render() {
    return (
      <div>
        <Segment>
          <UrlSearchForm onSubmit={this.onSubmitUrlSearch} />
        </Segment>

        {this.state.results && (
          <Segment>
            <UrlSearchResults results={this.state.results} />
          </Segment>
        )}
      </div>
    );
  }
}
