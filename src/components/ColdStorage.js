import React from "react";
import HostList from "./HostList";
import { Segment } from "semantic-ui-react";

function ColdStorage({ hosts, selectedHost, setSelectedHost }) {
  // console.log("selected host: ", selectedHost);
  return (
    <Segment.Group className="HQComps">
      <Segment compact>
        <h3 className="labels">ColdStorage</h3>
      </Segment>
      <Segment compact>
        <HostList
          hosts={hosts}
          selectedHost={selectedHost}
          setSelectedHost={setSelectedHost}
        />
      </Segment>
    </Segment.Group>
  );
}

export default ColdStorage;
