import React from "react";
import { render } from "@testing-library/react";
import School from "./School";

test("renders Device List", () => {
  const devList = {
    school: "demo",
    updateSchool: jest.fn(),
    noOfRedDevices: 3
  };
  const { container } = render(<School {...devList} />);
  expect(container.children[0]).toHaveClass("schoolData");
  const innerCHild = container.children[0].children;

  expect(innerCHild[0].children[0]).toHaveTextContent("Academy ID");
  expect(innerCHild[1].children[0]).toHaveTextContent("3");
});
