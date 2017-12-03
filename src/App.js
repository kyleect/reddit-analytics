import React, { Component } from "react";
import "./App.css";
import { ControlForm } from "./components/utils/control-form";

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
      .then(data => this.setState({ results: data }))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="App">
        <h1>Link Info</h1>

        <ControlForm
          initialState={{ url: "" }}
          onSubmit={this.setSearchResults}
        >
          {({ onChange, value }) => (
            <div>
              <input
                type="text"
                onChange={onChange("url")}
                value={value("url")}
              />

              <button>Search</button>
            </div>
          )}
        </ControlForm>

        {this.state.results && (
          <div>
            <h2>Results</h2>

            <p>Url: {this.state.url}</p>

            <table>
              <thead>
                <tr>
                  <th>Subreddit</th>
                  <th>Title</th>
                  <th>Author</th>
                </tr>
              </thead>
              <tbody>
                {this.state.results &&
                  this.state.results.data.children.map(result => (
                    <tr style={{ textAlign: "left" }}>
                      <td>{result.data.subreddit}</td>
                      <td>{result.data.title}</td>
                      <td>{result.data.author}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

export default App;
