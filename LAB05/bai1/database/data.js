import * as SQLite from 'expo-sqlite/legacy';

const db = SQLite.openDatabase('media_places.db');

const createTable = () => {
  db.transaction(tx => {

    // Delete database
     tx.executeSql('DROP TABLE IF EXISTS places;', []);
    tx.executeSql('DROP TABLE IF EXISTS videos;', []);

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS videos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        uri TEXT,
        timestamp INTEGER
      );`
    );
    
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        locationName TEXT,
        imageUri TEXT,
        latitude REAL,
        longitude REAL,
        timestamp INTEGER
      );`
    );
  });
};

const saveVideoToDB = async (uri, callback) => {
  const timestamp = Date.now(); 
  try {
    await new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO videos (uri, timestamp) VALUES (?, ?)',
          [uri, timestamp],
          (_, result) => resolve(result),
          (_, error) => reject(error)
        );
      });
    });
    console.log('Video saved:', uri);
    if (callback) callback(); 
  } catch (error) {
    console.error('Error saving video:', error);
  }
};

export const savePlace = async (title, locationName, imageUri, latitude, longitude) => {
  const timestamp = Date.now(); 
  try {
    await new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO places (title, locationName, imageUri, latitude, longitude, timestamp) VALUES (?, ?, ?, ?, ?, ?)',
          [title, locationName, imageUri, latitude, longitude, timestamp],
          (_, result) => resolve(result),
          (_, error) => reject(error)
        );
      });
    });
    console.log('Place saved:', locationName);
  } catch (error) {
    console.error('Error saving place:', error);
  }
};

export const getAllVideos = async (callback) => {
  try {
    const videos = await new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM videos ORDER BY timestamp DESC;', 
          [],
          (_, { rows }) => {
            resolve(rows._array);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
    callback(videos);
  } catch (error) {
    console.error('Error fetching videos:', error);
  }
};

export const getPlaces = async () => {
  try {
    const result = await new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM places ORDER BY timestamp DESC;', 
          [],
          (_, { rows }) => {
            resolve(rows._array); 
          },
          (_, error) => {
            reject(error); 
          }
        );
      });
    });
    return result;
  } catch (error) {
    console.error('Error fetching places:', error);
  }
};

export const getMediaData = (callback) => {
  getAllVideos((videoData) => {
    getPlaces().then((placeData) => {
      callback(videoData, placeData); 
    });
  });
};



createTable(); 

export { saveVideoToDB };
