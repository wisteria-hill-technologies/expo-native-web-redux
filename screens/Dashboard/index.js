import React, { useEffect } from "react";
import { StyleSheet, ScrollView, KeyboardAvoidingView} from "react-native";
import { Title, Text } from "../../theme/Typography";
import routeTitleMapper from "../../components/Routes/routeTitleMapper";
import * as Speech from "expo-speech";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FitbitAuth from "../../components/FitbitAuth";
import SummaryDataDisplay from '../../components/SummaryDataDisplay';


const Dashboard = ({ history }) => {
  const { pathname } = history.location || {};
  const { name, title } = routeTitleMapper(pathname) || {};
  Speech.speak(`You are on ${title}.`);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.container}
      // keyboardVerticalOffset={60}
    >
      <Header />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <FitbitAuth />
        <SummaryDataDisplay />
      </ScrollView>
      <Footer />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: { alignItems: 'center', justifyContent: 'center', width: '100%', paddingTop: 30, paddingBottom: 50, paddingHorizontal: 30 }
});

export default Dashboard;
