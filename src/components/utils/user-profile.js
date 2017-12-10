import React from "react";
import PropTypes from "prop-types";
import { Segment, Statistic, Item } from "semantic-ui-react";

async function fetchUser(user) {
  if (user.length === 0) {
    return;
  }

  const encodedUser = encodeURIComponent(`${user}`);

  const requestUrl = `https://www.reddit.com/user/${encodedUser}/about.json`;

  const response = await fetch(requestUrl, {
    method: "GET",
    headers: new Headers(),
    mode: "cors",
    cache: "default"
  });

  const json = await response.json();
  const results = json.data;

  return results;
}

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined
    };
  }

  async componentDidMount() {
    try {
      const user = await fetchUser(this.props.userId);
      this.setState({ user });
    } catch (e) {
      console.log(e);
    }
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.userId !== this.props.userId) {
      try {
        const user = await fetchUser(nextProps.userId);
        this.setState({ user });
      } catch (e) {
        console.log(e);
      }
    }
  }

  render() {
    return (
      <div>
        {this.state.user ? (
          <div>
            <Item>
              <Item.Image size="tiny" src={this.state.user.icon_img} />

              <Item.Content>
                <Item.Header>{this.state.user.name}</Item.Header>
              </Item.Content>
            </Item>

            <Statistic>
              <Statistic.Value>{this.state.user.comment_karma}</Statistic.Value>
              <Statistic.Label>Comment Karma</Statistic.Label>
            </Statistic>

            <Statistic>
              <Statistic.Value>{this.state.user.link_karma}</Statistic.Value>
              <Statistic.Label>Link Karma</Statistic.Label>
            </Statistic>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}

UserProfile.propTypes = {
  userId: PropTypes.string.isRequired
};

export default UserProfile;
