export const timestampToDateString = (
  timestamp: firebase.firestore.Timestamp
) => {
  return timestamp.toDate().toLocaleString();
};
