import { createBrowserRouter } from 'react-router';
import Home from '../pages/home';

// import { getUserInfo } from '../utils/user';

// function PrivateRoute({ children }: { children: JSX.Element }) {
//   const token = useUserStore((state) => state.token);
//   return !token ? children : <Navigate to="/login" replace />;
// }

// async function authMiddleware() {
//   const userData = await getUserInfo();

//   if (!userData) {
//     throw login();
//   }
// }

const router = createBrowserRouter(
  [
    {
      path: '/',
      // middleware: [authMiddleware],
      element: <Home />,
    },
  ],
  {
    basename: '/react-19',
  },
);

export default router;
