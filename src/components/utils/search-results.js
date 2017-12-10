import React from "react";
import {
  Segment,
  Item,
  List,
  Icon,
  Divider,
  Statistic,
  Input
} from "semantic-ui-react";
import moment from "moment";

export const SearchResults = ({ results }) => {
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
                <List.Item>{result.url}</List.Item>
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
