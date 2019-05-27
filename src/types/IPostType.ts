import { IChapter } from "./IChapter";

export default interface IPostType {
  id: string;
  title: string;
  descriptionShort: string;
  timestamp: firebase.firestore.Timestamp;
  category: string;
  chapters: IChapter[];
}
