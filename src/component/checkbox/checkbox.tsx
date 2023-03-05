import React, { useState } from "react";
import Animated, {
  withSpring,
  withSequence,
  useSharedValue,
  cancelAnimation,
  useAnimatedStyle,
} from "react-native-reanimated";
import { View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { makeUseStyles } from "../../helpers/makeUseStyles";

interface CheckboxProps {
  isChecked: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({}) => {
  const scale = useSharedValue(1);
  const { styles, palette } = useStyles();
  const [isChecked, setIsChecked] = useState(false);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const startAnimation = () => {
    cancelAnimation(scale);
    scale.value = withSequence(
      withSpring(0.7),
      withSpring(1.05),
      withSpring(0.85),
      withSpring(1)
    );
  };

  return (
    <Animated.View style={animatedStyle}>
      <View style={[styles.checkbox, styles.checkedBox]}>
        <FontAwesome
          size={18}
          icon="check"
          onPress={startAnimation}
          iconColor={isChecked ? palette.white : palette.transparent}
        />
      </View>
    </Animated.View>
  );
};

const useStyles = makeUseStyles(({ palette }) => ({
  checkbox: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: palette.hairlineColor,
    backgroundColor: palette.grey,
  },
  checkedBox: {
    borderWidth: 0,
    borderColor: palette.transparent,
    backgroundColor: palette.checked,
  },
}));
