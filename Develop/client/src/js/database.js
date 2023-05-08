import { openDB } from 'idb';

const dbName = 'jate';
const dbVersion = 1;
const dbObjectStoreName = 'jate';

const initializeDatabase = async () => {
  const db = await openDB(dbName, dbVersion, {
    upgrade(database) {
      if (database.objectStoreNames.contains(dbObjectStoreName)) {
        console.log(`${dbObjectStoreName} database already exists`);
        return;
      }
      database.createObjectStore(dbObjectStoreName, { keyPath: 'id', autoIncrement: true });
      console.log(`${dbObjectStoreName} database created`);
    },
  });
  return db;
};

const getDb = async (content) => {
  console.log('Adding to the database');
  const db = await initializeDatabase();
  const transaction = db.transaction(dbObjectStoreName, 'readwrite');
  const objectStore = transaction.objectStore(dbObjectStoreName);
  const request = objectStore.add(content);
  const result = await request;
  console.log('Result:', result);
  return result;
};

const putDb = async () => {
  console.log('Getting all from the database');
  const db = await initializeDatabase();
  const transaction = db.transaction(dbObjectStoreName, 'readonly');
  const objectStore = transaction.objectStore(dbObjectStoreName);
  const request = objectStore.getAll();
  const result = await request;
  console.log('Result:', result);
  return result;
};

initializeDatabase();

export { getDb, putDb };
