interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
  }

  const products: Product[] = [
    {
        id: 1,
        name: "Ico",
        description: "Description for product 1",
        price: 25,
        image: "https://www.shortlist.com/media/images/2019/05/50-greatest-video-game-covers-152-1556729291-7gPD-column-width-inline.jpg"
    },
    {
        id: 2,
        name: "Shadow of the colossus",
        description: "Description for product 2",
        price: 35,
        image: "https://www.shortlist.com/media/images/2019/05/50-greatest-video-game-covers-193-1556729316-l7pq-column-width-inline.jpg"
    },
    {
        id: 3,
        name: "GTA vice city",
        description: "Description for product 3",
        price: 45,
        image: "https://www.shortlist.com/media/images/2019/05/50-greatest-video-game-covers-160-1556729296-IDis-column-width-inline.jpg"
    },
    {
        id: 4,
        name: "Quake III",
        description: "Description for product 3",
        price: 45,
        image: "https://www.shortlist.com/media/images/2019/05/50-greatest-video-game-covers-164-1556729298-1RTV-column-width-inline.jpg"
    },{
        id: 5,
        name: "Doom (1993)",
        description: "Description for product 3",
        price: 45,
        image: "https://www.shortlist.com/media/images/2019/05/50-greatest-video-game-covers-166-1556729299-wujx-column-width-inline.jpg"
    },
    {
        id: 6,
        name: "Left 4 dead",
        description: "Description for product 3",
        price: 45,
        image: "https://www.shortlist.com/media/images/2019/05/50-greatest-video-game-covers-175-1556729305-1VXz-column-width-inline.jpg"
    }
];

export default products;
