export interface IChapter {
  id: string;
  title: string;
  subtitle: string;
  content: IChapterContent[];
}

export interface IChapterContent {
  key: string;
  type: string;
  text: string;
}
