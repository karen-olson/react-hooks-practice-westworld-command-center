import React, { useEffect, useState } from "react";
import { Segment } from "semantic-ui-react";
import "../stylesheets/App.css";
import Headquarters from "./Headquarters";
import WestworldMap from "./WestworldMap";
import { Log } from "../services/Log";

function App() {
  const [hosts, setHosts] = useState([]);
  const [areas, setAreas] = useState([]);
  const [selectedHost, setSelectedHost] = useState(null);
  const [logs, setLogs] = useState([]);

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

          const newLog = Log.notify(
            `Notify: ${updatedHost.firstName} set in area ${updatedHost.area
              .split("_")
              .map((word) => word[0].toUpperCase() + word.slice(1))
              .join(" ")}`
          );
          setLogs([newLog, ...logs]);
        });
    } else {
      const newLog = Log.error(
        `Error: Too many hosts. Cannot add host to area.`
      );
      setLogs([newLog, ...logs]);
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

        if (activeStatusObject.active === true) {
          const newLog = Log.warn(`Activated ${updatedHost.firstName}`);
          setLogs([newLog, ...logs]);
        } else {
          const newLog = Log.notify(`Decommissioned ${updatedHost.firstName}`);
          setLogs([newLog, ...logs]);
        }
      });
  }

  function onActivateAll(activatedStatus) {
    const updatedHosts = hosts.map((host) => {
      return { ...host, active: activatedStatus };
    });

    setHosts(updatedHosts);

    if (activatedStatus === true) {
      const newLog = Log.warn(`Activating all hosts!`);
      setLogs([newLog, ...logs]);
    } else {
      const newLog = Log.notify(`Decommissioning all hosts.`);
      setLogs([newLog, ...logs]);
    }
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
        onActivateAll={onActivateAll}
        logs={logs}
        setLogs={setLogs}
      />
    </Segment>
  );
}

export default App;
