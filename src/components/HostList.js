import React from "react";
import Host from "./Host";
import { Card } from "semantic-ui-react";

function HostList({ hostsToDisplay, selectedHost, setSelectedHost }) {
  const hostCards = hostsToDisplay
    // .filter((host) => host.active === false)
    .map((host) => (
      <Host
        host={host}
        selectedHost={selectedHost}
        setSelectedHost={setSelectedHost}
        key={host.id}
      />
    ));

  return <Card.Group itemsPerRow={6}>{hostCards}</Card.Group>;
}

export default HostList;
