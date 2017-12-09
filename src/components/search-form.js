import React from "react";
import PropTypes from "prop-types";
import { Input } from "semantic-ui-react";
import { ControlForm } from "./utils/control-form";

const SearchForm = ({ label, onSubmit }) => (
  <ControlForm initialState={{ url: "" }} onSubmit={onSubmit}>
    {({ onChange, value, state }) => (
      <div>
        <Input
          type="text"
          id="url"
          label={label}
          action="Search"
          onChange={onChange("url")}
          value={value("url")}
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
