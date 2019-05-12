export default interface PostType {
  id: string;
  title: string;
  descriptionShort: string;
  timestamp: firebase.firestore.Timestamp;
}
