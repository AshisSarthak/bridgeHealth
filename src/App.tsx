import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

interface AppState {
  fullData: Object[];
}

export default class App extends Component<{}, AppState> {
  state: AppState = {
    fullData: []
  };
  componentDidMount() {
    fetch("./battery.json")
      .then(res => res.json())
      .then(response => {
        this.formatData(response);
      });
  }
  formatData = (data: any) => {
    const listOfSchools = [
      ...new Set(data.map((value: any) => value.academyId))
    ];
    const listOfDevices = [
      ...new Set(data.map((value: any) => value.serialNumber))
    ];
    console.log(listOfDevices);
  };
  render() {
    return <div>Hi</div>;
  }
}
