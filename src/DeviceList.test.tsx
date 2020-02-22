import React from "react";
import { render } from "@testing-library/react";
import DeviceList from "./DevliceList";

test("renders Device List", () => {
  const devList = {
    deviceList: [],
    finalPercent: 20.837874
  };
  const { container } = render(<DeviceList data={devList} />);
  expect(container.children[0]).toHaveClass("deviceContainer");
  const innerCHild = container.children[0].children;
  expect(innerCHild).toHaveLength(2);
  expect(innerCHild[0]).toHaveTextContent("Device Name Device Health 0.00%");
});
