import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import DeviceList from "./DevliceList";
import School from "./School";

interface AppState {
  fullData: Object[];
  schoolList: any[];
  selctedSchool: number;
}

export const HEALTH_BORDER: number = 10;

interface SchoolData {
  id: number;
  deviceList: any;
  allDevices: any;
  noOfRedDevices: number;
}

export default class App extends Component<{}, AppState> {
  state: AppState = {
    fullData: [],
    schoolList: [],
    selctedSchool: 0
  };
  componentDidMount() {
    fetch("./battery.json")
      .then(res => res.json())
      .then(response => {
        this.setState({
          fullData: response
        });
        this.formatData(response);
      });
  }

  findBatteryPercent = (batteryReading: any[]) => {
    let initialReading = 0;
    let initIndex = 0;
    let percentBattery: any[] = [];
    let timeSt: Date = new Date();
    batteryReading.forEach((value: any) => {
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
    const finalPercent =
      percentBattery.reduce((val: number, totalEntry: number) => {
        return totalEntry + val;
      }, 0) / percentBattery.length;

    batteryReading.push({ finalPercent });
    return batteryReading;
  };

  formatData = (data: any) => {
    const listOfSchools = [
      ...new Set(data.map((value: any) => value.academyId))
    ];
    const schoolList: SchoolData[] = [];
    listOfSchools.forEach((school: any) => {
      const listOfDevices = [data.filter((v: any) => v.academyId === school)];
      const listOfUniqueDevices = [
        ...new Set(listOfDevices[0].map((value: any) => value.serialNumber))
      ];
      const allDevices = this.findDevices(listOfUniqueDevices);
      schoolList.push({
        id: school,
        allDevices: listOfUniqueDevices,
        deviceList: allDevices,
        noOfRedDevices: this.getRedDevice(allDevices)
      });
    });
    this.setState({
      schoolList
    });
    this.getSortedData();
  };

  getRedDevice = (school: any[]): number => {
    let noOfRedDevice: number = 0;

    noOfRedDevice = school.filter((value: any) => {
      const totalLength = Object.entries(value).length - 1;
      return value[totalLength].finalPercent > HEALTH_BORDER;
    }).length;
    return noOfRedDevice;
  };

  findDevices = (deviceData: any) => {
    let batteryReadings: any[] = [];
    let newReadings: any[] = [];
    deviceData.forEach((value: any) => {
      batteryReadings[value] = this.state.fullData.filter(
        (val: any) => val.serialNumber === value
      );
    });
    Object.entries(batteryReadings).forEach((bRead: any) => {
      newReadings.push({
        ...this.findBatteryPercent(bRead[1])
      });
    });
    return newReadings;
  };

  getSortedData = () => {
    const newData = this.state.schoolList.sort(
      (a: SchoolData, b: SchoolData) => {
        return b.noOfRedDevices - a.noOfRedDevices;
      }
    );
    this.setState({
      schoolList: newData
    });
  };
  setSchool = (school: SchoolData) => {
    this.setState({
      selctedSchool: school.id
    });
  };

  getDeviceData = () => {
    const devData = this.state.schoolList.filter(
      val => val.id === this.state.selctedSchool
    )[0];

    const allEntries = devData.deviceList.map((v: any) => ({
      deviceList: v[0].serialNumber,
      finalPercent: v[Object.entries(v).length - 1].finalPercent
    }));
    return Object.values(allEntries).sort(
      (a: any, b: any) => b.finalPercent - a.finalPercent
    );
  };

  render() {
    return (
      <div className="container">
        <div className="schoolDetails">
          {this.state.schoolList.map((school, index) => {
            return (
              <School
                key={index}
                school={school}
                updateSchool={this.setSchool}
                noOfRedDevices={school.noOfRedDevices}
              />
            );
          })}
        </div>
        {!!this.state.selctedSchool && (
          <div className="deviceDetails">
            <DeviceList data={this.getDeviceData()} />
          </div>
        )}
      </div>
    );
  }
}
