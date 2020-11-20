import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

export default function App() {
  const [dogState, setDogState] = useState(dogImgValues.noneTap);

  const onStartShouldSetResponder = (evt) => {
    // If both button is Pressed
    if (evt.nativeEvent.touches.length === 2) {
      return true;
    }
    return false;
  };

  const onResponderRelease = (evt) => {
    setDogState(dogImgValues.noneTap);
  };

  const onResponderStart = (evt) => {
    setDogState(dogImgValues.bothTap);
  };

  const onPress = (buttonVal) => {
    // If left is tapped
    if (buttonVal === buttonValues.leftIn) {
      if (dogState === dogImgValues.noneTap) {
        setDogState(dogImgValues.leftTap);
        return;
      }
      if (dogState === dogImgValues.rightTap) {
        setDogState(dogImgValues.bothTap);
        return;
      }
    }

    // If left is untapped
    if (buttonVal === buttonValues.leftOut) {
      if (dogState === dogImgValues.bothTap) {
        setDogState(dogImgValues.rightTap);
        return;
      }
      setDogState(dogImgValues.noneTap);
    }

    // If right is tapped
    if (buttonVal === buttonValues.rightIn) {
      if (dogState === dogImgValues.noneTap) {
        setDogState(dogImgValues.rightTap);
        return;
      }
      if (dogState === dogImgValues.leftTap) {
        setDogState(dogImgValues.bothTap);
        return;
      }
    }

    // If right is untapped
    if (buttonVal === buttonValues.rightOut) {
      if (dogState === dogImgValues.bothTap) {
        setDogState(dogImgValues.leftTap);
        return;
      }
      setDogState(dogImgValues.noneTap);
    }
  };

  const onSoundLeft = () => {
    console.log('Sound left');
  };

  const onSoundRight = () => {
    console.log('Sound right');
  };

  const onSoundBoth = () => {
    console.log('Sound right');
  };

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.drummerContainer}>
        <Image style={styles.image} source={dogState} />
      </View>
      <View
        onResponderStart={onResponderStart}
        onResponderRelease={onResponderRelease}
        onStartShouldSetResponder={onStartShouldSetResponder}
        style={styles.footer}>
        <TouchableOpacity
          onPressIn={() => onPress(buttonValues.leftIn)}
          onPressOut={() => onPress(buttonValues.leftOut)}
          style={styles.textContainer}>
          <Text style={styles.text}>Left</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPressIn={() => onPress(buttonValues.rightIn)}
          onPressOut={() => onPress(buttonValues.rightOut)}
          style={styles.textContainer}>
          <Text style={styles.text}>Right</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const buttonValues = {
  leftIn: 'leftIn',
  leftOut: 'leftOut',
  rightIn: 'rightIn',
  rightOut: 'rightOut',
};

const dogImgValues = {
  leftTap: require('./assets/images/tap_left.png'),
  rightTap: require('./assets/images/tap_right.png'),
  bothTap: require('./assets/images/tap_both.png'),
  noneTap: require('./assets/images/tap_none.png'),
};

const dimensions = {
  deviceHeight: Dimensions.get('window').height,
  deviceWidth: Dimensions.get('window').width,
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
  },
  drummerContainer: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: dimensions.deviceHeight / 2,
    width: dimensions.deviceHeight / 2,
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 26,
  },
});
