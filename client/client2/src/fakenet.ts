let fakeCache = new Map<string, boolean>();

const cities = ['서울', '경상도 대구', '경상도 부산', '경상도 울산', '전라도 전주',
  '전라도 광주', '전라도 여수', '경기도 파주', '경기도 고양', '강원도 강릉', '강원도 속초'];

export interface CourseItemProps {
  id: number;
  thumbnail: string;
  name: string;
  short_desc: string;
}

const createData = (cities: string[]): CourseItemProps[] => {
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

export async function fakeNetwork(key: string) : Promise<CourseItemProps[]> {
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