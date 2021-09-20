import React from "react";
import { Segment, Image } from "semantic-ui-react";
import * as Images from "../services/Images";
import HostInfo from "./HostInfo";

function Details({
  hosts,
  selectedHost,
  setSelectedHost,
  areas,
  onAreaChange,
  onRadioClick,
}) {
  // We'll render the logo if no host is selected. But if a host does get selected....
  // add state to tell whether a host has been selected (selected, setSelected)

  // Watch the video to see how this works in the app.

  return (
    <Segment id="details" className="HQComps">
      {selectedHost === {} ? (
        <Image size="medium" src={Images.westworldLogo} />
      ) : null}

      {/* define props for HostInfo */}
      <HostInfo
        hosts={hosts}
        selectedHost={selectedHost}
        setSelectedHost={setSelectedHost}
        areas={areas}
        onAreaChange={onAreaChange}
        onRadioClick={onRadioClick}
      />
    </Segment>
  );
}

export default Details;
