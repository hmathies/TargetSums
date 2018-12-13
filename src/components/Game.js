import React from "react";
import { StyleSheet, Text, View } from "react-native";

class Game extends React.Component {
  targetNum = 10 + Math.floor(40 * Math.random());
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.target}>{this.targetNum}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ddd",
    paddingTop: 50
  },
  target: {
    fontSize: 40,
    backgroundColor: "#aaa",
    marginHorizontal: 50,
    textAlign: "center"
  }
});

export default Game;
