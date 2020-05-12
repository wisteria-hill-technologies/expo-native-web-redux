import React from "react";
import { ActivityIndicator as ActivityIndicatorPaper } from "react-native-paper";

const ActivityIndicator = ({ size, color, ...props }) => (
  <ActivityIndicatorPaper size={ size || 'large' } color={color || '#98cb00'} />
);

export default ActivityIndicator;
