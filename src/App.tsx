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
    const batteryReadings: any[] = [];
    listOfDevices.forEach((value: any) => {
      batteryReadings[value] = data.filter(
        (val: any) => val.serialNumber === value
      );
    });
    let initialReading = 0;
    let initIndex = 0;
    let percentBattery: any[] = [];
    let timeSt: Date = new Date();
    Object.values(batteryReadings)[0].forEach((value: any) => {
      if (!initialReading) {
        initialReading = value.batteryLevel * 100;
        timeSt = new Date(value.timestamp);
      } else if (value.batteryLevel * 100 < initialReading) {
        let newtimeSt: Date = new Date(value.timestamp);
        const diffInHr =
          Math.abs(newtimeSt.getTime() - timeSt.getTime()) / 36e5;
        percentBattery[initIndex] =
          ((initialReading - value.batteryLevel * 100) / diffInHr) * 24;
      } else {
        initialReading = value.batteryLevel * 100;
        initIndex++;
      }
    });
    const finalPercent = percentBattery.reduce(
      (val: number, totalEntry: number) => {
        return totalEntry + val;
      },
      0
    );
    const finalTime = Object.values(batteryReadings)[0][
      Object.values(batteryReadings)[0].length - 1
    ].timestamp;
    console.log(
      finalPercent /
        (Math.abs(new Date(timeSt).getTime() - new Date(finalTime).getTime()) /
          36e5)
    );
  };
  render() {
    return <div>Hi</div>;
  }
}
