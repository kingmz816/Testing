import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import projectsData from './projects.json';

function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState(projectsData);


  const filteredData = data.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <View style={styles.projectContainer}>
      <View style={styles.projectHeader}>
        <Text style={styles.location}>{item.location}</Text>
        <View style={styles.verificationContainer}>
          <Text style={styles.timePosted}>{item.timePosted}</Text>
          {item.paymentVerified ? (
            <Icon name="checkmark-circle" size={16} color="blue" />
          ) : (
            <Icon name="close-circle" size={16} color="red" />
          )}
        </View>
      </View>
      <Text style={styles.projectTitle}>{item.title}</Text>
      <View style={styles.projectDetails}>
        <Text style={styles.projectDetailText}>{item.price}</Text>
        <Text style={styles.projectDetailText}>{item.duration}</Text>
        <Text style={styles.projectDetailText}>{item.proposals} Proposals</Text>
      </View>
      <View style={styles.tagsContainer}>
        {item.tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header*/}
      <View style={styles.header}>
        <Text style={styles.greeting}>Hey,</Text>
        <Text style={styles.name}> Leri Kuns</Text>
        <Image source={{ uri: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36' }} style={styles.profileImage} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search projects..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Icon name="search" size={20} color="#888" />
      </View>

      {/* FlatList*/}
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

function CategoryScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text>Category Screen</Text>
    </View>
  );
}

function SavedScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text>Saved Screen</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text>Profile Screen</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Category') {
              iconName = focused ? 'list' : 'list-outline';
            } else if (route.name === 'Saved') {
              iconName = focused ? 'bookmark' : 'bookmark-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          tabBarShowLabel: false,
          tabBarStyle: { paddingBottom: 5, paddingTop: 5 },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Category" component={CategoryScreen} />
        <Tab.Screen name="Saved" component={SavedScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  greeting: {
    fontSize: 18,
    color: '#333',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 'auto',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 10,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    color: '#333',
  },
  projectContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    elevation: 2,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  location: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  verificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timePosted: {
    fontSize: 12,
    color: '#888',
    marginRight: 5,
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  projectDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  projectDetailText: {
    fontSize: 14,
    color: '#666',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#eee',
    borderRadius: 5,
    padding: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  tagText: {
    fontSize: 12,
    color: '#666',
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
