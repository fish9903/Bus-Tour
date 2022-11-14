import {createBrowserRouter} from 'react-router-dom';
import Layout from './layout/Layout';
import CheckPage from './page/check/CheckPage';
import DetailPage, {loader as DetailPageLoader} from './page/detail[id]/DetailPage';
import MainPage from './page/main/MainPage';
import SearchPage, {loader as SearchPageLoader} from './page/search/SearchPage';

const browserRouter = createBrowserRouter([
    {
      path: '/',
      element: <Layout/>,
      children: [
        {
          path: '',
          element:<MainPage/>
        },
        {
          path: 'search',
          element:<SearchPage/>,
          loader: SearchPageLoader
        },
        {
          path: 'check',
          element:<CheckPage/>
        },
        {
          path: 'detail/:id',
          element:<DetailPage/>,
          loader: DetailPageLoader
        }
      ]
    }
  ], {
});

export default browserRouter;