import React, { useState } from "react";
import { Segment, Button } from "semantic-ui-react";
import { Log } from "../services/Log";

function LogPanel({ onActivateAll, logs, setLogs }) {
  const [allActivated, setAllActivated] = useState(false);

  // function dummyLogs() {
  //   // This is just to show you how this should work. But where should the log data actually get stored?
  //   // And where should we be creating logs in the first place?
  //   logs.unshift(Log.warn("This is an example of a warn log"));
  //   logs.unshift(Log.notify("This is an example of a notify log"));
  //   logs.unshift(Log.error("This is an example of an error log"));

  //   return logs;
  // }

  function handleClick(e) {
    setAllActivated(!allActivated);
    onActivateAll(!allActivated);
  }

  return (
    <Segment className="HQComps" id="logPanel">
      <pre>
        {logs.map((log, i) => (
          <p key={i} className={log.type}>
            {log.msg}
          </p>
        ))}
      </pre>
      <Button
        fluid
        color={allActivated ? "red" : "green"}
        content={allActivated ? "DEACTIVATE ALL" : "ACTIVATE ALL"}
        onClick={handleClick}
      />
    </Segment>
  );
}

export default LogPanel;
