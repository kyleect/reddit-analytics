import React from "react";
import PropTypes from "prop-types";
import { Input } from "semantic-ui-react";
import { ControlForm } from "./control-form";

const SearchForm = ({ label, onSubmit }) => (
  <ControlForm initialState={{ query: "" }} onSubmit={onSubmit}>
    {({ onChange, value, state }) => (
      <div>
        <Input
          type="text"
          id="query"
          label={label}
          action="Search"
          onChange={onChange("query")}
          value={value("query")}
          style={{ width: "100%" }}
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
