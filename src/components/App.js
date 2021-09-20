import React, { useEffect, useState } from "react";
import { Segment } from "semantic-ui-react";
import "../stylesheets/App.css";
import Headquarters from "./Headquarters";
import WestworldMap from "./WestworldMap";

function App() {
  const [hosts, setHosts] = useState([]);
  const [areas, setAreas] = useState([]);
  const [selectedHost, setSelectedHost] = useState({});

  // fetch request for hosts & areas arrays

  useEffect(() => {
    fetch("http://localhost:3001/hosts")
      .then((resp) => resp.json())
      .then((hosts) => setHosts(hosts));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/areas")
      .then((resp) => resp.json())
      .then((areas) => setAreas(areas));
  }, []);

  function onAreaChange(id, areaObject) {
    // checks for area limit
    // if limit not exceeded, patches host's area property

    const hostsInArea = hosts.filter(
      (host) => host.area === areaObject.area
    ).length;
    const areaLimit = areas.find((area) => area.name === areaObject.area).limit;

    if (hostsInArea < areaLimit) {
      fetch(`http://localhost:3001/hosts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(areaObject),
      })
        .then((response) => response.json())
        .then((updatedHost) => {
          const updatedHosts = hosts.map((host) => {
            if (host.id === id) {
              return updatedHost;
            } else {
              return host;
            }
          });
          setSelectedHost(updatedHost);
          setHosts(updatedHosts);
        });
    } else {
      console.log("area limit exceeded");
    }
  }

  function onRadioClick(id, activeStatusObject) {
    // updates "active" property of host object

    fetch(`http://localhost:3001/hosts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(activeStatusObject),
    })
      .then((response) => response.json())
      .then((updatedHost) => {
        const updatedHosts = hosts.map((host) => {
          if (host.id === id) {
            return updatedHost;
          } else {
            return host;
          }
        });
        setSelectedHost(updatedHost);
        setHosts(updatedHosts);
      });
  }

  function filterActive() {
    // filters active/decommissioned hosts.
    // nondestructively creates activeHosts array to send to WWMap
    //    and decommissionedHosts array to send to HQ
  }

  return (
    <Segment id="app">
      <WestworldMap
        hosts={hosts}
        areas={areas}
        selectedHost={selectedHost}
        setSelectedHost={setSelectedHost}
      />
      <Headquarters
        hosts={hosts}
        areas={areas}
        onAreaChange={onAreaChange}
        onRadioClick={onRadioClick}
        selectedHost={selectedHost}
        setSelectedHost={setSelectedHost}
      />
    </Segment>
  );
}

export default App;
