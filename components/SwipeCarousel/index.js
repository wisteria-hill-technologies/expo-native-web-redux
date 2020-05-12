import React, { useRef } from "react";
import { View, StyleSheet, Dimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {Card} from "react-native-paper";
import {Title} from "../../theme/Typography";

const SwipeCarousel = ({ items, history }) => {
  const carouselRef = useRef();

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.slide}>
        <Card
          style={styles.slideInnerContainer}
          onPress={() => {
            history.push(`/category/${item.cat_id}`);
          }}
        >
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} style={{ height: 550 }}/>
          <Card.Content>
            <Title>{item.label}</Title>
          </Card.Content>
        </Card>
      </View>
    );
  };

  return (
    <Carousel
      ref={carouselRef}
      data={items}
      renderItem={renderItem}
      sliderWidth={sliderWidth}
      itemWidth={itemWidth}
      containerCustomStyle={{ flex: 1 }}
      slideStyle={{ flex: 1 }}
      layout={'tinder'}
    />
  );
};

const horizontalMargin = 30;
const slideWidth = Dimensions.get('window').width;
const sliderWidth = Dimensions.get('window').width;
const itemWidth = slideWidth + horizontalMargin * 2;

const styles = StyleSheet.create({
  slide: {
    width: itemWidth,
  },
  slideInnerContainer: {
    width: slideWidth
  }
});

export default SwipeCarousel;
