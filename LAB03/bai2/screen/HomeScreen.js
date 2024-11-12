import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createTable, addNote, getNotes } from '../database/notesService';

const HomeScreen = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Tạo bảng khi component được mount
    createTable();
    // Lấy ghi chú ban đầu
    loadNotes();
  }, []);

  const loadNotes = () => {
    getNotes((fetchedNotes) => {
      setNotes(fetchedNotes);
    });
  };

  const handleAddNote = () => {
    addNote(title, content, () => {
      setTitle('');
      setContent('');
      loadNotes(); // Tải lại ghi chú sau khi thêm mới
    });
  };

  const handleEditNote = (note) => {
    navigation.navigate('EditNote', {
      id: note.id,
      currentTitle: note.title,
      currentContent: note.content,
    });
  };


  return (
    <View style={styles.body}>
          <View style={styles.container}>
      <Text style={styles.title}>Note App</Text>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Content"
        value={content}
        onChangeText={setContent}
        style={{ height: 80, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
      />
      <Button title="Add Note" onPress={handleAddNote} />

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleEditNote(item)}>
            <View style={{ marginVertical: 10 }}>
              <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
              <Text>{item.content}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
      backgroundColor: '#F2F4F7',
      flex: 1,

  },
  container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#F2F4F7',
      justifyContent: 'center',
      marginHorizontal: 30,
      marginTop:10
  },
  title:{
      textAlign:'center',
      fontSize: 25,
      color: 'red',
      fontWeight:'bold'
  },
  logoutButton: {
      marginTop: 10,
      backgroundColor: '#24A0ED',
      height: 40,
      width: 120,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center'

  },
  logoutButtonText: {
      color: 'white',

  }
  

});
export default HomeScreen
