export default interface PostType {
  id: string;
  title: string;
  content: string;
  timestamp: firebase.firestore.Timestamp;
}
