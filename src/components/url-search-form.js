import React from "react";
import { Input } from "semantic-ui-react";
import { ControlForm } from "./utils/control-form";

export const UrlSearchForm = ({ onSubmit }) => (
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
