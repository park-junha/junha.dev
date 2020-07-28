export interface AboutContents {
  title: string;
  intro: string;
  interests: Items;
  contact: Items;
};

export interface Items {
  heading: string;
  items: Array<Item>;
};

export interface Item {
  subheading?: string;
  name: string;
  url?: string;
};
