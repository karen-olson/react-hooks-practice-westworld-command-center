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

          // const newLog = Log.notify(
          //   `Notify: ${updatedHost.firstName} set in area ${updatedHost.area}`
          // );
          // setLogs([newLog, ...logs]);
        });
    } else {
      console.log("too many hosts");
      // Log.error(`Error: Too many hosts. Cannot add host to area`);
      // fix formatting w/ host name and area name
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

  function onActivateAll(activatedStatus) {
    const updatedHosts = hosts.map((host) => {
      return { ...host, active: activatedStatus };
    });

    setHosts(updatedHosts);

    // const patchedHosts = hosts.forEach((host) => {
    //   const updatedHost = { ...host, active: activatedStatus };
    //   console.log("id: ", host.id);

    //   fetch(`http://localhost:3001/host/${host.id}`, {
    //     method: "PATCH",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(updatedHost),
    //   })
    //     .then((response) => response.json())
    //     .then((data) => console.log(data));
    // });
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
