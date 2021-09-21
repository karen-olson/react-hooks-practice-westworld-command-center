import React, { useState } from "react";
import { Segment, Button } from "semantic-ui-react";

function LogPanel({ onActivateAll, logs }) {
  const [allActivated, setAllActivated] = useState(false);

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
