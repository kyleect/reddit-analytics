import React from "react";
import PropTypes from "prop-types";
import { Input, Dropdown, Divider } from "semantic-ui-react";
import { ControlForm } from "./control-form";

const sortOptions = [
  {
    text: "Relevant",
    value: "relevant"
  },
  {
    text: "Hot",
    value: "hot"
  },
  {
    text: "New",
    value: "new"
  },
  {
    text: "Comments",
    value: "comments"
  }
];

const nsfwOptions = [
  {
    text: "NSFW",
    value: "yes"
  },
  {
    text: "SFW",
    value: "no"
  }
];

const SearchForm = ({ label, onSubmit }) => (
  <ControlForm
    initialState={{ query: "", sort: "relevant", nsfw: "yes" }}
    onSubmit={onSubmit}
  >
    {({ bind, state, value, onChange }) => (
      <div>
        <Input
          type="text"
          id="query"
          label={label}
          action="Search"
          style={{ width: "100%" }}
          {...bind("query")}
        />

        <Divider />

        <Dropdown
          fluid
          selection
          value={value("sort")}
          placeholder="Sort"
          onChange={(e, data) =>
            onChange("sort")({
              ...e,
              target: { ...e.target, value: data.value }
            })
          }
          options={sortOptions}
        />

        <Divider />

        <Dropdown
          fluid
          selection
          value={value("nsfw")}
          placeholder="NSFW"
          onChange={(e, data) =>
            onChange("nsfw")({
              ...e,
              target: { ...e.target, value: data.value }
            })
          }
          options={nsfwOptions}
        />
      </div>
    )}
  </ControlForm>
);

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  label: PropTypes.string
};

SearchForm.defaultProps = {
  label: "Query"
};

export default SearchForm;
