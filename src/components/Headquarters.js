import React from "react";
import { Grid } from "semantic-ui-react";
import Details from "./Details";
import ColdStorage from "./ColdStorage";
import LogPanel from "./LogPanel";
import "../stylesheets/Headquarters.css";

function Headquarters({
  hosts,
  areas,
  onAreaChange,
  onRadioClick,
  selectedHost,
  setSelectedHost,
  onActivateAll,
  logs,
  setLogs,
}) {
  // console.log("selected host: ", selectedHost);
  return (
    <Grid celled="internally">
      <Grid.Column width={8}>
        <ColdStorage
          hosts={hosts}
          selectedHost={selectedHost}
          setSelectedHost={setSelectedHost}
        />
      </Grid.Column>
      <Grid.Column width={5}>
        <Details
          hosts={hosts}
          areas={areas}
          onAreaChange={onAreaChange}
          onRadioClick={onRadioClick}
          selectedHost={selectedHost}
          setSelectedHost={setSelectedHost}
        />
      </Grid.Column>
      <Grid.Column width={3}>
        <LogPanel onActivateAll={onActivateAll} logs={logs} setLogs={setLogs} />
      </Grid.Column>
    </Grid>
  );
}

export default Headquarters;
