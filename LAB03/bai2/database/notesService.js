import * as SQLite from 'expo-sqlite/legacy';

//22520767 Nguyễn Cương Lĩnh

const db = SQLite.openDatabase('notes.db');

export const createTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT);',
      [],
      () => console.log('Table created successfully'),
      (tx, error) => console.log('Error creating table', error)
    );
  });
};

// CRUD

export const addNote = (title, content, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO notes (title, content) VALUES (?, ?);',
      [title, content],
      (_, result) => {
        console.log('Note added', result);
        if (callback) callback();
      },
      (tx, error) => console.log('Error inserting note', error)
    );
  });
};

export const getNotes = (callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM notes;',
      [],
      (_, result) => {
        console.log('Notes retrieved', result.rows._array);
        if (callback) callback(result.rows._array);
      },
      (tx, error) => console.log('Error fetching notes', error)
    );
  });
};

export const updateNote = (id, title, content, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      'UPDATE notes SET title = ?, content = ? WHERE id = ?;',
      [title, content, id],
      (_, result) => {
        console.log('Note updated', result);
        if (callback) callback();
      },
      (tx, error) => console.log('Error updating note', error)
    );
  });
};

export const deleteNote = (id, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      'DELETE FROM notes WHERE id = ?;',
      [id],
      (_, result) => {
        console.log('Note deleted', result);
        if (callback) callback(result);
      },
      (tx, error) => console.log('Error deleting note', error)
    );
  });
};