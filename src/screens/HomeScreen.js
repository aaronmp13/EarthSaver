import React from 'react';
import { SectionList, ScrollView, StyleSheet, Text, View } from 'react-native';
import Firebase from '../firebase/config';


const auth = Firebase.auth();



const DATA = [
    {
      title: "My Points",
      data: ["0"]
    },
    {
      title: "Tasks To Do",
      data: ["X", "X"]
    },
  ];
  
const Item = ({ title }) => (
  <ScrollView style={styles.item}>
      <Text style={styles.title}>{title}</Text>
  </ScrollView>
);

class HomeScreen extends React.Component {
  render() {
      const renderItem = ({ item }) => (
            <Item title={item.title} />
      );
      const handleSignOut = async () => {
        try {
          await auth.signOut();
        } catch (error) {
          console.log(error);
        }
      };

      console.log(auth.DATA)

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

  export default HomeScreen;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      fontFamily: 'Raleway-Black',
    },

    item: {
        backgroundColor: 'dodgerblue',
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 10,
        shadowOpacity: 20,
        shadowColor: 'black',
        fontFamily: "Roboto"
    },

    title: {
      fontSize: 25,
      color: 'white',
      fontFamily: "Roboto",
    },
    header: {
        fontSize: 25,
        marginHorizontal: 20,
        marginVertical: 0,
        fontFamily: "Roboto"
    },
  });