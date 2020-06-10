import React, { useEffect } from 'react';
import {StyleSheet, View, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getFitbitDailyActivitySummary } from '../../store/actions';
import {BigTitle, Title } from "../../theme/Typography";
import Button from '../Button';
import * as Speech from 'expo-speech';
import makeSummaryVoice from "./makeSummaryVoice";

const SummaryDataDisplay = () => {
  const { dailyActivitySummaries, authenticated } = useSelector(state => state.fitbit);

  const dispatch = useDispatch();

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() -1);
  const yesterdayStr = `${yesterday.getFullYear()}-${yesterday.getMonth()+1}-${yesterday.getDate()}`;

  useEffect(() => {
    if (authenticated) {
      dispatch(getFitbitDailyActivitySummary());
      dispatch(getFitbitDailyActivitySummary(yesterdayStr));
    }
  }, [authenticated]);

  if (!dailyActivitySummaries) {
    return (
      <View style={styles.container}>
        <Title>No Data Shown</Title>
      </View>
    );
  }

  const { summary: todaySummary } = dailyActivitySummaries[todayStr] || {};
  const { summary: yesterdaySummary } = dailyActivitySummaries[todayStr] || {};

  const todaysSummary = makeSummaryVoice({ prefix: 'Today ', ...todaySummary });
  const yesterdaysSummary = makeSummaryVoice({ prefix: 'Yesterday ', ...yesterdaySummary });

  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <BigTitle>Today's Summary</BigTitle>
        <Button
          icon="voice"
          mode="contained"
          onPress={() => {
            Speech.speak(todaysSummary+yesterdaysSummary);
          }}
          accesibilityLabel="Voice"
        >
          READ ALOUD
        </Button>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleWrapper: {
    paddingTop: 30,
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  }
});

export default SummaryDataDisplay;
