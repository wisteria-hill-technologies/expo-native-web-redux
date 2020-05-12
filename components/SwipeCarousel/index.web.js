import React from "react";
import { View } from 'react-native';
import {Card} from "react-native-paper";
import {Title} from "../../theme/Typography";

const SwipeCarousel = ({ items, history, small }) => {

  return (
    <div
      style={styles.wrapper}
    >
      {
        items.map(item => {
          return (
            <View key={item.cat_id} style={[styles.slide, small ? {} : { width: '40%', minWidth: 500, maxWidth: 600 }]}>
              <Card
                style={styles.slideInnerContainer}
                onPress={() =>{ history.push(`/category/${item.cat_id}`) }}
              >
                <Card.Cover source={{ uri: 'https://picsum.photos/700' }} style={small ? {} : { height: 550 }}/>
                <Card.Content>
                  <Title>{item.label}</Title>
                </Card.Content>
              </Card>
            </View>
          )
        })
      }
    </div>
  );
};

const styles = {
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    overflow: 'overlay'
  },
  slide: {
    padding: 15,
    minWidth: 250,
  }
};

export default SwipeCarousel;
