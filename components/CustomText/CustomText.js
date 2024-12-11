import React from "react";
import { Text, StyleSheet } from "react-native";

const CustomText = ({ children }) => {
  return <Text style={styles.text}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "IRANSansWeb",
  },
});

export default CustomText;
