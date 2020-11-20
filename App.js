import React, {useState, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import RNShake from 'react-native-shake';

const Sound = require('react-native-sound');
Sound.setCategory('Playback');

export default function App() {
  const [dogState, setDogState] = useState(dogImgValues.noneTap);
  const [isCatVibing, setCatVibe] = useState(false);
  const [isInfoVisible, setInfoVisibility] = useState(false);

  useEffect(() => {
    RNShake.addEventListener('ShakeEvent', () => {
      onShake();
    });
    return () => RNShake.removeEventListener('ShakeEvent');
  }, []);

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
    onSoundBoth();
  };

  const onShake = () => {
    if (shakeSound.isPlaying()) {
      return;
    }

    setCatVibe(true);
    shakeSound.play(() => setCatVibe(false));
  };

  const onPress = (buttonVal) => {
    // If left is tapped
    if (buttonVal === buttonValues.leftIn) {
      onSoundLeft();
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
      onSoundRight();
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
    tapLeftSound.setVolume(1).play();
  };

  const onSoundRight = () => {
    tapRightSound.setVolume(1).play();
  };

  const onSoundBoth = () => {
    tapLeftSound.setVolume(1).play();
    tapRightSound.setVolume(1).play();
  };

  const renderCatGif = () => {
    if (isCatVibing) {
      return (
        <Image
          style={styles.image}
          source={require('./assets/images/shake.gif')}
        />
      );
    } else {
      return null;
    }
  };

  const renderInfo = () => {
    if (isInfoVisible) {
      return (
        <Text style={styles.infoTxt}>
          Music and gif is not mine, Please check
          'https://www.youtube.com/watch?v=NUYvbT6vTPs'
        </Text>
      );
    } else {
      return null;
    }
  };

  return (
    <SafeAreaView style={styles.main}>
      <TouchableOpacity
        style={styles.infoBtn}
        onPressIn={() => setInfoVisibility(true)}
        onPressOut={() => setInfoVisibility(false)}>
        <Text style={styles.infoTxt}>i</Text>
      </TouchableOpacity>
      <View style={styles.drummerContainer}>
        {renderInfo()}
        <Text>Shake for magic</Text>
        <Image style={styles.image} source={dogState} />
        {renderCatGif()}
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

const shakeSound = new Sound('shake.mp3', Sound.MAIN_BUNDLE);
const tapLeftSound = new Sound('tap_left.wav', Sound.MAIN_BUNDLE);
const tapRightSound = new Sound('tap_right.wav', Sound.MAIN_BUNDLE);

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
  infoBtn: {
    top: 18,
    right: 18,
    position: 'absolute',
    height: 20,
    width: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgray',
  },
  infoTxt: {
    fontWeight: '400',
    fontSize: 10,
    textAlign: 'center',
  },
});
