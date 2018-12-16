import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View, Button } from "react-native";
import RandomNumber from "./RandomNumber";
import shuffle from "lodash.shuffle";

class Game extends React.Component {
  static propTypes = {
    randomNumberCount: PropTypes.number.isRequired,
    initialSeconds: PropTypes.number.isRequired,
    onPlayAgain: PropTypes.func.isRequired
  };
  state = {
    selectedIds: [],
    remainingSeconds: this.props.initialSeconds
  };
  gameStatus = "PLAYING";
  randomNumbers = Array.from({ length: this.props.randomNumberCount }).map(
    () => 1 + Math.floor(10 * Math.random())
  );
  targetNum = this.randomNumbers
    .slice(0, this.props.randomNumberCount - 2)
    .reduce((acc, curr) => acc + curr, 0);
  shuffledRandomNumbers = shuffle(this.randomNumbers);
  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState(
        prevState => {
          return { remainingSeconds: prevState.remainingSeconds - 1 };
        },
        () => {
          if (this.state.remainingSeconds === 0) {
            clearInterval(this.intervalId);
          }
        }
      );
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  isNumberSelected = numberIndex => {
    return this.state.selectedIds.indexOf(numberIndex) >= 0;
  };
  selectNumber = numberIndex => {
    this.setState(prevState => ({
      selectedIds: [...prevState.selectedIds, numberIndex]
    }));
  };
  componentWillUpdate(nextProps, nextState) {
    if (
      nextState.selectedIds !== this.state.selectedIds ||
      nextState.remainingSeconds === 0
    ) {
      this.gameStatus = this.calcGameStatus(nextState);
      if (this.gameStatus !== "PLAYING") {
        clearInterval(this.intervalId);
      }
    }
  }
  calcGameStatus = nextState => {
    const sumSelected = nextState.selectedIds.reduce((acc, curr) => {
      return acc + this.shuffledRandomNumbers[curr];
    }, 0);
    if (nextState.remainingSeconds === 0) {
      return "LOST";
    }
    if (sumSelected < this.targetNum) {
      return "PLAYING";
    }
    if (sumSelected === this.targetNum) {
      return "WON";
    }
    if (sumSelected > this.targetNum) {
      return "LOST";
    }
  };

  render() {
    const gameStatus = this.gameStatus;
    return (
      <View style={styles.container}>
        <Text style={[styles.target, styles[`STATUS_${gameStatus}`]]}>
          {this.targetNum}
        </Text>
        <View style={styles.randomContainer}>
          {this.shuffledRandomNumbers.map((randomNumber, index) => (
            <RandomNumber
              key={index}
              id={index}
              number={randomNumber}
              isDisabled={
                this.isNumberSelected(index) || gameStatus !== "PLAYING"
              }
              onPress={this.selectNumber}
            />
          ))}
        </View>
        {this.gameStatus !== "PLAYING" && (
          <Button title="Play Again" onPress={this.props.onPlayAgain} />
        )}
        <Text>{this.state.remainingSeconds}</Text>
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
    margin: 50,
    textAlign: "center"
  },
  randomContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 30,
    justifyContent: "space-around"
  },
  STATUS_PLAYING: {
    backgroundColor: "skyblue"
  },
  STATUS_WON: {
    backgroundColor: "green"
  },
  STATUS_LOST: {
    backgroundColor: "red"
  }
});

export default Game;
