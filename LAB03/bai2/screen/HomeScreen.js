import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { createTable, getNotes, deleteNote } from '../database/notesService';
import AntDesign from '@expo/vector-icons/AntDesign';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { SettingsContext } from '../context/SettingsContext';

 
const HomeScreen = ({ navigation }) => {
  const { isDarkMode } = useContext(SettingsContext);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    createTable();
    loadNotes();

    const unsubscribe = navigation.addListener('focus', () => {
      loadNotes();
    });

    return unsubscribe;
  }, [navigation]);

  const loadNotes = () => {
    getNotes((fetchedNotes) => {
      setNotes(fetchedNotes);
    });
  };

  const handleEditNote = (note) => {
    navigation.navigate('EditNote', {
      id: note.id,
      currentTitle: note.title,
      currentContent: note.content,
    });
  };

  const handleDeleteNote = (id) => {
    deleteNote(id, () => {
      setNotes((prevNotes) => prevNotes.filter(note => note.id !== id));
    });
  }

  return (
    <View style={[styles.body, { backgroundColor: isDarkMode ? '#111111' : '#F2F4F7' }]}>
      <StatusBar />
      <View style={styles.container}>
        <Text style={[styles.title, { color: isDarkMode ? '#0097FA' : 'red' }]}>Note App</Text>
        <View style={styles.addContainer}>
          <Text style={[styles.subtitle, { color: isDarkMode ? '#FFF' : '#727272' }]}>All Notes</Text>
          <TouchableOpacity onPress={() => navigation.navigate('AddNote')}>
            <AntDesign name="pluscircle" size={48} color={isDarkMode ? '#0097FA' : 'red'} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={notes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={[
              styles.noteContainer,
            { borderColor: isDarkMode ? '#FFF' : '#727272' },
            { backgroundColor: isDarkMode ? 'black' : '#F2F4F7' },
            ]}>
              <TouchableOpacity onPress={() => handleEditNote(item)}>
                <View style={styles.noteTextContainer}>
                  <Text style={[styles.noteTitle, { color: isDarkMode ? 'white' : '#727272' }]}>{item.title}</Text>
                  <Text style={[styles.noteText, { color: isDarkMode ? 'white' : '#727272' }]}>{item.content}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteNote(item.id)}>
                <EvilIcons name="trash" size={45} color={isDarkMode ? 'white' : 'black'} />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: 15,
    marginTop: 30,
  },
  title: {
    textAlign: 'center',
    fontSize: 35,
    marginTop: 10,
    color: 'red',
    fontWeight: 'bold',
  },
  addContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  subtitle: {
    fontSize: 25,
    color: '#727272',
    fontWeight: 'bold',
  },

  noteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    borderColor: '#727272',
    borderWidth: 1,
    padding: 15,
    borderRadius: 5,
    shadowColor: 'black'
  },
  noteTextContainer: {
    maxWidth: 300
  },
  noteTitle: {
    fontSize: 25,
    color: '#727272',
    fontWeight: 'bold',
  },
  noteText: {
    marginTop: 5,
    fontSize: 22,
    color: '#727272',
  }

});

export default HomeScreen;
