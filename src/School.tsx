import React from "react";

export interface SchoolProps {
  school: any;
  updateSchool: any;
}

export const School: React.FC<SchoolProps> = (props: SchoolProps) => {
  return (
    <div className="schoolData">
      <div
        className="schoolName"
        onClick={() => props.updateSchool(props.school)}
      >
        {props.school.id}
      </div>
    </div>
  );
};

export default School;
