import { ICourseWithPrograms, ICourseWithThumbnail } from "./interface/Course.interface";
import { IOrderWithCourseInfo } from "./interface/Order.interface";

let fakeCache = new Map<string, boolean>();

const cities = ['서울', '경상도 대구', '경상도 부산', '경상도 울산', '전라도 전주',
  '전라도 광주', '전라도 여수', '경기도 파주', '경기도 고양', '강원도 강릉', '강원도 속초'];


const createData = (cities: string[]): ICourseWithThumbnail[] => {
  let id = 0;
  const arr = cities.map(
    name => {
      return {
        id: id++,
        thumbnail: "/ugly_cat.jpg",
        name: name,
        short_desc: `아름다운 ${name}에 어서오세요!`
      }
    }
  )

  return arr;
}

export async function fakeNetwork(key: string) : Promise<ICourseWithThumbnail[]> {
  // // if (!key) {
  // //   fakeCache = {};
  // // }

  // if (fakeCache.get(key)) {
  //   return;
  // }

  // fakeCache.set(key, true);

  return new Promise(res => {
    setTimeout(() => res(createData(cities)), Math.random() * 800);
  });
}

export const mockprogram: ICourseWithPrograms = {
  id: 1,
  name: "강원도 속초",
  short_desc: "아름다운 강원도 속초로 놀러오세요~",
  thumbnail: "/ugly_cat.jpg",
  description: `A paragraph with *emphasis* and **strong importance**.

  > A block quote with ~strikethrough~ and a URL: https://reactjs.org.
  
  * Lists
  * [ ] todo
  * [x] done
  
  A table:
  
  | a | b |
  | - | - |
  `,
  programs: [
      {
          id: 1,
          ariv_date: new Date('2022-10-11'),
          dep_date: new Date('2022-10-10'),
          state: "ok",
          max_count: 40,
          rem_count: 10,
          cid: 1,
      },
      {
          id: 2,
          ariv_date: new Date('2022-10-12'),
          dep_date: new Date('2022-10-11'),
          state: "ok",
          max_count: 40,
          rem_count: 10,
          cid: 1,
      },
      {
          id: 3,
          ariv_date: new Date('2022-10-13'),
          dep_date: new Date('2022-10-12'),
          state: "ok",
          max_count: 40,
          rem_count: 10,
          cid: 1,
      }
  ],
  priceinfos: [
      { price: 5000, type: "p1" },
      { price: 7500, type: "p2" },
      { price: 10000, type: "p3" },

  ]
}

export const mockorder: IOrderWithCourseInfo = {
  id: '1423-432432643-54354',
  card_number:'1234567890123456',
  order_date: new Date('2022-10-13T09:00:00-06:30'),
  up_date:new Date('2022-10-13T09:00:00-06:30'),
  personinfos: [
    {
      type:"p1",
      count: 5,
      price_pp: 5000
    },
    {
      type:"p2",
      count: 3,
      price_pp: 7500
    },
    {
      type:"p3",
      count: 2,
      price_pp: 10000
    }
  ],
  QRcode:"/server/qrcode/reafdsfe",
  state:"ok",
  total_price:67500,
  program: {
      id: 1,
      ariv_date: new Date('2022-10-11'),
      dep_date: new Date('2022-10-10'),
      state: "ok",
      max_count: 41,
      rem_count: 14,
      cid: 1,
  },
  course: createData(cities.slice(1))[0],
  user: {
    name:"곽두팔",
    phone_number:"01012345678"
  }
}