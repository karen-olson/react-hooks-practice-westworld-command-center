import React from "react";
import Host from "./Host";
import { Card } from "semantic-ui-react";

function HostList({ hosts, selectedHost, setSelectedHost }) {
  const hostsToDisplay = hosts
    // .filter((host) => host.active === false)
    .map((host) => (
      <Host
        host={host}
        selectedHost={selectedHost}
        setSelectedHost={setSelectedHost}
        key={host.id}
      />
    ));

  return <Card.Group itemsPerRow={6}>{hostsToDisplay}</Card.Group>;
}

export default HostList;
