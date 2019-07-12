import { IChapter } from "./IChapter";

export default interface IPost {
  id: string;
  title: string;
  descriptionShort: string;
  timestamp: firebase.firestore.Timestamp;
  category: string;
  chapters: IChapter[];
}
