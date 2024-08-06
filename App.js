import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';

const data = require('./data.json');

export default function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(data);
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => setSelectedItem(item)}>
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {selectedItem && (
        <View style={styles.selectedItem}>
          <Text style={styles.nameLarge}>{selectedItem.name}</Text>
          <Text style={styles.descText}>{selectedItem.email}</Text>
          <Text style={styles.descText}>{selectedItem.phone}</Text>
          <Text style={styles.descText}>{selectedItem.address}</Text>
        </View>
      )}
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e2124',
    paddingTop: 50,
  },
  item: {
    backgroundColor: '#36393e',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedItem: {
    backgroundColor: '#7289da',
    padding: 50,
    margin: 20,
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  nameLarge: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  descText: {
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
  }
});
