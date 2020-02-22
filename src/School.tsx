import React from "react";

export interface SchoolProps {
  school: any;
  updateSchool: any;
  noOfRedDevices: number;
}

export const School: React.FC<SchoolProps> = (props: SchoolProps) => {
  return (
    <div
      className="schoolData"
      onClick={() => props.updateSchool(props.school)}
      title="Click to see device details"
    >
      <div className="schoolName">
        <div className="label">Academy ID</div>
        {props.school.id}
      </div>
      <div className="deviceNo">
        <div className="deviceCount">{props.noOfRedDevices}</div>
        <div className="deviceLabel">Bad Devices</div>
      </div>
    </div>
  );
};

export default School;
