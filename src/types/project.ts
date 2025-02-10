export interface Project {
  _id: string;
  date: string;
  title: string;
  url: string;
  image: {
    dominantColor: string;
    asset: any;
  };
  videoUrl: string;
  category: string;
  services: string[];
}
