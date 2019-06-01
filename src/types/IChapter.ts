export interface IChapter {
  id: number;
  title: string;
  subtitle: string;
  content: IChapterContent[];
}

export interface IChapterContent {
  key: string;
  type: string;
  text: string;
}
