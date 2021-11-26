import React from 'react';
import { SectionList, FlatList, StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
    },

    item: {
        backgroundColor: '#c8c2ff',
        padding: 20,
        marginVertical: 20,
        marginHorizontal: 20,
        borderRadius: 10,
    },

    title: {
      fontSize: 25,
    },
    header: {
        fontSize: 25,
        marginHorizontal: 20,
        marginVertical: 0,
    },
  });

const DATA = [
    {
      title: "Main dishes",
      data: ["X"]
    },
    {
      title: "Sides",
      data: ["X"]
    },
    {
      title: "Drinks",
      data: ["X"]
    },
    {
      title: "Desserts",
      data: ["X"]
    }
  ];
  
  const Item = ({ title }) => (
    <ScrollView style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </ScrollView>
  );
  
  class Feed extends React.Component {
    render() {
        const renderItem = ({ item }) => (
            <Item title={item.title} />
        );

      return (
        <View style={styles.container}>
            <SectionList
                sections={DATA}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <Item title={item} />}
                renderSectionHeader={({ section: { title } }) => (
                <Text style={styles.header}>{title}</Text>
                )}
            />
        </View>
      );
    }
  }
  export default Feed;

  //get the (5) latest submission docs by timestamp 
  //display them in DATA items