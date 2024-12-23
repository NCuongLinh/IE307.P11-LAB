import * as SQLite from 'expo-sqlite/legacy';

// Mở cơ sở dữ liệu chung
const db = SQLite.openDatabase('media_places.db');

// Tạo bảng video và bảng địa điểm nếu chưa có
const createTable = () => {
  db.transaction(tx => {
    // Tạo bảng videos
    //tx.executeSql('DROP TABLE IF EXISTS places;', []);
    //tx.executeSql('DROP TABLE IF EXISTS videos;', []);
    // Gọi hàm xóa cơ sở dữ liệu

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS videos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        uri TEXT,
        timestamp INTEGER
      );`
    );
    
    // Tạo bảng places
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

// Lưu video vào cơ sở dữ liệu
const saveVideoToDB = async (uri, callback) => {
  const timestamp = Date.now(); // Get current timestamp
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
    if (callback) callback(); // Call callback to update UI
  } catch (error) {
    console.error('Error saving video:', error);
  }
};

// Lưu địa điểm vào cơ sở dữ liệu
export const savePlace = async (title, locationName, imageUri, latitude, longitude) => {
  const timestamp = Date.now(); // Lấy thời gian hiện tại
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

// Lấy tất cả video từ cơ sở dữ liệu
export const getAllVideos = async (callback) => {
  try {
    const videos = await new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM videos ORDER BY timestamp DESC;', // Sắp xếp theo timestamp
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

// Lấy tất cả địa điểm từ cơ sở dữ liệu
export const getPlaces = async () => {
  try {
    const result = await new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM places ORDER BY timestamp DESC;', // Sắp xếp theo timestamp
          [],
          (_, { rows }) => {
            resolve(rows._array); // Trả về tất cả các địa điểm
          },
          (_, error) => {
            reject(error); // Nếu có lỗi
          }
        );
      });
    });
    return result;
  } catch (error) {
    console.error('Error fetching places:', error);
  }
};

// Hàm gọi để lấy tất cả các địa điểm và video đã lưu
export const getMediaData = (callback) => {
  getAllVideos((videoData) => {
    getPlaces().then((placeData) => {
      callback(videoData, placeData); // Truyền cả video và địa điểm vào callback
    });
  });
};



createTable(); // Đảm bảo bảng được tạo khi ứng dụng chạy

export { saveVideoToDB };
