import React from "react";
import { render } from "@testing-library/react";
import Device from "./Device";

test("renders Device Details", () => {
  const { container } = render(
    <Device name="abc" finalPercent={5} border={10} />
  );
  expect(container.children[0]).toHaveClass("device good");
  expect(container.children[0].children).toHaveLength(2);
});

test("renders Device Details with negativw", () => {
  const { container } = render(
    <Device name="abc" finalPercent={15} border={10} />
  );
  expect(container.children[0]).toHaveClass("device bad");
  expect(container.children[0].children).toHaveLength(2);
});
