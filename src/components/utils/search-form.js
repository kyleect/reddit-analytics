import React from "react";
import PropTypes from "prop-types";
import { Input, Dropdown, Divider, Checkbox } from "semantic-ui-react";
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

const SearchForm = ({ label, onSubmit }) => (
  <ControlForm
    initialState={{ query: "", options: false, sort: "relevant", nsfw: true }}
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

        <Checkbox
          toggle
          label="Options"
          checked={value("options")}
          onChange={(e, data) =>
            onChange("options")({
              ...e,
              target: { ...e.target, value: data.checked }
            })
          }
        />

        {state.options && (
          <div>
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

            <Checkbox
              toggle
              label="NSFW"
              checked={value("nsfw")}
              onChange={(e, data) =>
                onChange("nsfw")({
                  ...e,
                  target: { ...e.target, value: data.checked }
                })
              }
            />
          </div>
        )}
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
