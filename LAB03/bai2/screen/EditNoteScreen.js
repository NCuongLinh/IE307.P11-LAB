import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { updateNote } from '../database/notesService';

export default function EditNoteScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { id, currentTitle, currentContent } = route.params;

  const [title, setTitle] = useState(currentTitle);
  const [content, setContent] = useState(currentContent);

  const handleUpdateNote = () => {
    updateNote(id, title, content, () => {
      navigation.goBack(); // Quay lại màn hình trang chủ sau khi cập nhật
    });
  };


  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Content"
        value={content}
        onChangeText={setContent}
        style={[styles.input, { height: 80 }]}
        multiline
      />
      <Button title="Update Note" onPress={handleUpdateNote} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
});
