import React from "react";
import "./App.css";

export interface DeviceProps {
  name: string;
  finalPercent: number;
  border: number;
}

export const Device: React.FC<DeviceProps> = (props: DeviceProps) => {
  const getClassName = () =>
    props.finalPercent > props.border ? "device bad" : "device good";
  return (
    <div className={getClassName()}>
      <div className="deviceName">
        <div className="label">Device Name </div>
        {props.name}
      </div>
      <div className="devicePer">
        <div className="label ">Device Health </div>
        {props.finalPercent.toFixed(2)}%
      </div>
    </div>
  );
};

export default Device;
