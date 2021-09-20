import React from "react";
import { Card } from "semantic-ui-react";
import "../stylesheets/Host.css";

function Host({ host, selectedHost, setSelectedHost }) {
  /* NOTE: The className "host selected" renders a different style than simply "host". */
  function handleHostClick() {
    setSelectedHost(host);
  }

  return (
    <Card
      className={host === selectedHost ? "host selected" : "host"}
      onClick={handleHostClick}
      image={host.imageUrl}
      raised
      link
    />
  );
}

export default Host;
