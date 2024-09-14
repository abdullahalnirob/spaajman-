
import { createBrowserRouter } from 'react-router-dom';


import App from '../../App';
import Home from '../Home/Home';
import Register from "../Register"
import ServicesPage from "../ServicesPage"
import Login from "../Login"
import Blog from '../Blog';
import BlogDetails from '../BlogDetails';
import UserProfile from '../JopPOst';
import JobList from '../JobList';
import JobDetails from '../JobDetails';
import JobApplicationForm from '../JobApplicationForm';
import Gallery from '../Gallery';
import Dashboard from '../Dashboard/Dashbord';
import ShopRegister from '../ShopRegister';
import DeshboardCard from '../Dashboard/DeshboardCard';
import PrivateRouter from './PrivateRouter';
import ShopRequestAdmin from '../Dashboard/ShopRequestAdmin';
import Error from '../Error';
import Profile from '../Dashboard/Profile';
import AllShopAdmin from '../Dashboard/AllShopAdmin';
import PostedJob from '../Dashboard/PostedJob';
import AppliedJob from '../Dashboard/AppliedJob';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/services/:id',
        element: <ServicesPage />,
        loader: ({ params }) => fetch(`https://spaajman-server.vercel.app/shop/${params.id}`)
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/blog",
        element: <Blog />
      },
      {
        path: "/blog/:id",
        element: <BlogDetails />,
        loader: ({ params }) => fetch(`https://spaajman-server.vercel.app/blogs/${params.id}`)
      }
      ,
      {
        path: "/job-search",
        element: <JobList />
      },
      {
        path: "/job-details/:id",
        element: <JobDetails />,
        loader: ({ params }) => fetch(`https://spaajman-server.vercel.app/jobs/${params.id}`)
      }
      ,
      {
        path: "/jobs/apply/:id",
        element: <PrivateRouter><JobApplicationForm /></PrivateRouter>,
        loader: ({ params }) => fetch(`https://spaajman-server.vercel.app/jobs/${params.id}`)
      },
      {
        path: "/gallery",
        element: <Gallery />
      },



    ],
  }, {
    path: "/dashboard",
    element: <PrivateRouter><Dashboard /></PrivateRouter>,
    errorElement: <Error />,
    children: [
      // user routes
      {
        path: "registerShop",
        element: <ShopRegister />
      },
      {
        path: 'profile',
        element: <Profile />
      },
      // shop register routes
      {
        path: "post-job",
        element: <UserProfile />
      },
      {
        path: 'Orders',
        element: <DeshboardCard></DeshboardCard>
      },
      // admin routes
      {
        path: 'Customer',
        element: <DeshboardCard></DeshboardCard>
      },
      {
        path: 'shop-request-admin',
        element: <ShopRequestAdmin />
      },
      {
        path: 'all-shop',
        element: <AllShopAdmin />
      },
      {
        path: 'PostedJob',
        element: <PostedJob></PostedJob>
      },
      {
        path: 'appliedJob',
        element: <AppliedJob></AppliedJob>
      }

    ]
  },
]);
