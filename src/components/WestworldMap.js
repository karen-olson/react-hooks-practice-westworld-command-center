import React from "react";
import Area from "./Area";
import { Segment } from "semantic-ui-react";

function WestworldMap({ hosts, areas, selectedHost, setSelectedHost }) {
  const areaComponents = areas.map((area) => (
    <Area
      area={area}
      hosts={hosts}
      selectedHost={selectedHost}
      setSelectedHost={setSelectedHost}
      key={area.id}
    />
  ));

  return <Segment id="map">{areaComponents}</Segment>;
}

export default WestworldMap;
