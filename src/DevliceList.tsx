import React from "react";
import Device from "./Device";
import "./App.css";
import { HEALTH_BORDER } from "./App";

interface AppProps {
  data: any;
}

export const DeviceList: React.FC<AppProps> = (props: AppProps) => {
  return (
    <div className="deviceContainer">
      {Object.values(props.data).map((value: any) => (
        <Device
          key={value.deviceList}
          name={value.deviceList}
          finalPercent={value.finalPercent || 0}
          border={HEALTH_BORDER}
        />
      ))}
    </div>
  );
};

export default DeviceList;
