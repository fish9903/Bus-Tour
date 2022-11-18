import { createBrowserRouter } from 'react-router-dom';
import ErrorState from './layout/ErrorState';
import Layout from './layout/Layout';
import CheckPage, { loader as CheckPageLoader } from './page/check/CheckPage';
import ConfirmPage, { loader as ConfirmPageLoader } from './page/confirm[id]/ConfirmPage';
import DetailPage, { loader as DetailPageLoader } from './page/detail[id]/DetailPage';
import ErrorPage from './page/error/ErrorPage';
import MainPage from './page/main/MainPage';
import PurchasePage, {
  loader as PurchasePageLoader,
  // action as PurchasePageAction
} from './page/purchase[id]/PurchasePage';
import SearchPage, { loader as SearchPageLoader } from './page/search/SearchPage';

const browserRouter = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorState />,
    children: [
      {
        path: '',
        children: [
          {
            path: '',
            element: <MainPage />
          },
          {
            path: 'search',
            element: <SearchPage />,
            loader: SearchPageLoader
          },
          {
            path: 'check',
            element: <CheckPage />,
            loader: CheckPageLoader
          },
          {
            path: 'detail/:id',
            element: <DetailPage />,
            loader: DetailPageLoader
          },
          {
            path: 'purchase/:id',
            element: <PurchasePage />,
            loader: PurchasePageLoader,
            // action: PurchasePageAction
          },
          {
            path: 'confirm/:id',
            element: <ConfirmPage />,
            loader: ConfirmPageLoader
          },
          {
            path: 'error',
            element: <ErrorPage />
          }
        ]
      }
    ]
  }
], {
});

export default browserRouter;