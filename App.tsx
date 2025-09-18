import { parse } from "@babel/core";
import React, {useState} from "react";
import { StyleSheet,Text,View,TextInput,Button,Alert } from "react-native";

interface BMIData {
  age: number;
  weightLbs: string;
  weightKgs: string;
  heightCm: string;
  heightFt: string;
  heightIn: string;
  unitSystem: string;
  bmi: number | null;
  category: string;
}

export default class App extends React.Component<{}, BMIData> {
  data: BMIData = {
    //default values from calculator.net
    age: 25,
    weightLbs: '160',
    weightKgs: '65',
    heightCm: '180',
    heightFt: '5',
    heightIn: '10',
    unitSystem: 'US',

    bmi: null,
    category: '',
  };


  calculateBmi = () => {
    const unitSystem: string = this.data.unitSystem;
    let weight: number; //kgs
    let height: number; //meters

    //convert us units to cm/kg etc cuz that's less calculating
    if(unitSystem === "US") {
      const weightLbs: number = parseFloat(this.data.weightLbs);
      const heightFt: number = parseFloat(this.data.heightFt);
      const heightIn: number = parseFloat(this.data.heightIn);

      if( //will need to separate individually later for different Alerts
        isNaN(weightLbs) ||
        isNaN(heightFt) ||
        isNaN(heightIn) ||
        weightLbs <= 0 ||
        heightFt < 0 ||
        heightIn >= 12 ||
        heightIn < 0
      ) {
        Alert.alert("Invalid US unit weight/height"); return;
      } else {
        weight = weightLbs * 0.453592;
        height = ((heightFt * 12 + heightIn) * 2.54) / 100;
      }
    } else if(unitSystem === "Metric") {
      const weightKgs: number = parseFloat(this.data.weightKgs);
      const heightCm: number = parseFloat(this.data.heightCm);

      if(
        isNaN(weightKgs) ||
        isNaN(heightCm) ||
        weightKgs <= 0 ||
        heightCm < 0
      ) {
        Alert.alert("Invalid metric unit weight/height"); return; //change to match calculator.net later?
      } else {
        weight = weightKgs;
        height = heightCm / 100;
      }
    } else {
      Alert.alert("Invalid unit system!"); return;
    }

    const BMIVal: number = weight / (height * height);
    this.setState({
      bmi: Number(BMIVal.toFixed(2)),
      category
        : BMIVal < 16
        ? 'Severe Thinness'
        : BMIVal >= 16 && BMIVal < 17
        ? 'Moderate Thinness'
        : BMIVal >= 17 && BMIVal < 18.5
        ? 'Mild Thinness'
        : BMIVal >= 18.5 && BMIVal < 25
        ? 'Normal'
        : BMIVal >= 25 && BMIVal < 30
        ? 'Overweight'
        : BMIVal >= 30 && BMIVal < 35
        ? 'Obese Class I'
        : BMIVal >= 35 && BMIVal < 40
        ? 'Obese Class II'
        : 'Obese',
    });
  };

  render() {
    return  (

    )
  }
}