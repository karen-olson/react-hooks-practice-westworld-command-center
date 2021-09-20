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
      {console.log(selectedHost === {})}
      {selectedHost ? (
        <HostInfo
          hosts={hosts}
          selectedHost={selectedHost}
          setSelectedHost={setSelectedHost}
          areas={areas}
          onAreaChange={onAreaChange}
          onRadioClick={onRadioClick}
        />
      ) : (
        <Image size="medium" src={Images.westworldLogo} />
      )}
    </Segment>
  );
}

export default Details;
