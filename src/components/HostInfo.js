import React, { useState } from "react";
import {
  Radio,
  Icon,
  Card,
  Grid,
  Image,
  Dropdown,
  Divider,
} from "semantic-ui-react";
import "../stylesheets/HostInfo.css";

function HostInfo({
  hosts,
  selectedHost,
  setSelectedHost,
  areas,
  onAreaChange,
  onRadioClick,
}) {

  // const formattedNames = areas.names.map(area => )

  const options = areas.map((area) => {
    return { key: area.id, text: area.name, value: area.name };
  });

  function handleOptionChange(e, { value }) {
    // See the Semantic docs for more info: https://react.semantic-ui.com/modules/dropdown/#usage-controlled
    onAreaChange(selectedHost.id, { area: value });
  }

  function handleRadioChange(e, { checked }) {
    onRadioClick(selectedHost.id, { active: checked });
  }

  return (
    <Grid>
      <Grid.Column width={6}>
        <Image
          src={selectedHost.imageUrl}
          floated="left"
          size="small"
          className="hostImg"
        />
      </Grid.Column>
      <Grid.Column width={10}>
        <Card>
          <Card.Content>
            <Card.Header>
              {selectedHost.firstName} |{" "}
              {selectedHost.gender === "Male" ? (
                <Icon name="man" />
              ) : (
                <Icon name="woman" />
              )}
              {/* Think about how the above should work to conditionally render the right First Name and the right gender Icon */}
            </Card.Header>
            <Card.Meta>
              {/* Sometimes the label should take "Decommissioned". How are we going to conditionally render that? */}
              {/* Checked takes a boolean and determines what position the switch is in. Should it always be true? */}
              <Radio
                onChange={handleRadioChange}
                label={selectedHost.active ? "Active" : "Decommissioned"}
                checked={selectedHost.active}
                slider
              />
            </Card.Meta>
            <Divider />
            Current Area:
            <Dropdown
              onChange={handleOptionChange}
              value={selectedHost.area}
              options={options}
              selection
            />
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid>
  );
}

export default HostInfo;
