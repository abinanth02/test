import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Chart from "./src/widgets/chart";
import PieChartScreen from "./src/screens/Piechatt";
import SemiDonutChart from "./src/widgets/SemiDonutChart";

const data = [
  { color: "#a7c763", value: 900 },
  { color: "#5fc782", value: 550 },
  { color: "#55b2cf", value: 425 },
  { color: "#ac55cf", value: 750 },
];

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {/* <Chart /> */}
      {/* <PieChartScreen /> */}

      <View style={styles.semiDonutChartContainer}>
        <SemiDonutChart
          data={data}
          size={55}
          depth={10}
          style={{
            canvas: {
              height: 300,
              width: 300,
              // backgroundColor: "blue",
            },
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    // backgroundColor: "red",
    // alignItems: "center",
    // justifyContent: "center",
  },
  semiDonutChartContainer: {
    height: 180,
    width: 300,
    backgroundColor: "#f7f7f7",
    margin: 20,
    marginTop: 40,
  },
});
