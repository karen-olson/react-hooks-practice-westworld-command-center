import React from "react";
import HostList from "./HostList";
import "../stylesheets/Area.css";

function Area({ hosts, area, selectedHost, setSelectedHost }) {
  // clean up areaName
  const areaName = area.name
    .split("_")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

  const activeHosts = hosts.filter((host) => host.active === true);

  const hostsInArea = activeHosts.filter((host) => host.area === area.name);

  return (
    <div className="area" id={area.name}>
      <h3 className="labels">{areaName}</h3>
      {
        <HostList
          hostsToDisplay={hostsInArea}
          selectedHost={selectedHost}
          setSelectedHost={setSelectedHost}
        />
      }
    </div>
  );
}

Area.propTypes = {
  hosts: function (props) {
    if (props.hosts.length > props.limit) {
      throw Error(
        `HEY!! You got too many hosts in ${props.name}. The limit for that area is ${props.limit}. You gotta fix that!`
      );
    }
  },
};

export default Area;
