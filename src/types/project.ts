export interface Project {
  _id: string;
  date: string;
  title: string;
  url: string;
  image: {
    dominantColor: string;
    asset: {
      url: string;
      _ref: string;
      _type: "reference";
    };
  };
  videoUrl: string;
  category: string;
  services: string[];
}
