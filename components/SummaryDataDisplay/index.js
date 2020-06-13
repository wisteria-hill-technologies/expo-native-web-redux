import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getFitbitDailyActivitySummary, getFitbitDailyHeartRateSummary } from '../../store/actions';
import {BigTitle, Title } from "../../theme/Typography";
import Button from '../Button';
import * as Speech from 'expo-speech';
import makeSummaryVoice from "./makeSummaryVoice";
import {Card} from "react-native-paper";
import { selectColor } from '../../theme/utils';
import {dismissAuthSession} from "expo-web-browser";

const SummaryDataDisplay = () => {
  const { dailyActivitySummaries, dailyHeartRateSummaries, authenticated } = useSelector(state => state.fitbit);
  const [ finishedSpeaking, setFinishedSpeaking ] = useState(false);

  const dispatch = useDispatch();

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() -1);
  const yesterdayStr = `${yesterday.getFullYear()}-${yesterday.getMonth()+1}-${yesterday.getDate()}`;

  const useFitBitQuestion = 'Would you like to access Fitbit?  We will collect your anonymized data for medical research purposes.';

  useEffect(() => {
    if (authenticated) {
      dispatch(getFitbitDailyActivitySummary());
      dispatch(getFitbitDailyActivitySummary(yesterdayStr));
      dispatch(getFitbitDailyHeartRateSummary(todayStr, '7d'));
    } else {
      Speech.speak(useFitBitQuestion);
    }
  }, [authenticated]);

  useEffect(() => {
    if (dailyActivitySummaries && !finishedSpeaking) {
      Speech.speak(summaryVoice);
      setFinishedSpeaking(true);
    }
  }, [dailyActivitySummaries]);

  if (!dailyActivitySummaries) {
    return (
      <View style={styles.container}>
        <Card
          style={[styles.card, { borderColor: selectColor('primary'), width: '100%' }]}
        >
          <Card.Content style={{ width: '100%'}}>
            <BigTitle>{useFitBitQuestion}</BigTitle>
          </Card.Content>
        </Card>
      </View>
    );
  }

  const { summary: todaySum } = dailyActivitySummaries[todayStr] || {};
  const { summary: yesterdaySum } = dailyActivitySummaries[todayStr] || {};

  const thankyouMessage = "Thank you. We collected your ananymized data for today.  ";
  const todaysSummary = makeSummaryVoice({ prefix: 'Today ', ...todaySum });
  const yesterdaysSummary = makeSummaryVoice({ prefix: 'Yesterday ', ...yesterdaySum });
  const summaryVoice = thankyouMessage + todaysSummary + yesterdaysSummary;

  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <BigTitle>Today's Summary</BigTitle>
        <Button
          icon="voice"
          mode="contained"
          onPress={() => {
            Speech.speak(summaryVoice);
          }}
          accesibilityLabel="Voice"
        >
          READ ALOUD
        </Button>
        <Card
          style={[styles.card, { borderColor: selectColor('primary'), width: '100%' }]}
        >
          <Card.Content style={{ width: '100%'}}>
            <BigTitle>{summaryVoice}</BigTitle>
          </Card.Content>
        </Card>
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
    paddingTop: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },
  card: {
    flex: 1,
    margin: 10,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 20,
  }
});

export default SummaryDataDisplay;
