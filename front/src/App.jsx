import "./index.css";
import {
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import PortfolioPage from "./components/portfolios/Portfolios.jsx";
import DashboardLayout from "./components/layouts/DashboardLayout.jsx";
import PortfolioDetails from "./components/portfolios/PortfolioDetails.jsx";
import SymbolsPage from "./components/symbols/SymbolsPage.jsx";
import NotFoundPage from "./pages/NotFound.jsx";
import Profile from "./components/users/UserProfile.jsx";
import Settings from "./components/users/Settings.jsx";
import WatchList from "./components/checkList/watchList.jsx";
import WatchListWeekly from "./components/checkList/watchListWeekly.jsx";

function App() {
  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <Login />,
  //   },
  //   {
  //     path: "/dashboard",
  //     element: (
  //       <ProtectedRoute>
  //         <DashboardLayout />
  //       </ProtectedRoute>
  //     ),
  //     handle: { breadcrumb: "داشبورد" },
  //     children: [
  //       {
  //         index: true,
  //         element: <Dashboard />,
  //       },
  //       {
  //         path: "portfolios",
  //         element: <PortfolioPage />,
  //         handle: { breadcrumb: "سبدها" },
  //       },
  //       {
  //         path: "portfolios/:id",
  //         element: <PortfolioDetails />,
  //         // loader: portfolioLoader,
  //         handle: { breadcrumb: (data) => data?.name },
  //         children:[
  //           {path:"*",element:<PortfolioDetails />}
  //         ]
  //       },
  //       {
  //         path: "symbols",
  //         element: <SymbolsPage />,
  //         handle: { breadcrumb: "نمادها" },
  //       },
  //     ],
  //   },
  //   {
  //     path: "*",
  //     element: <NotFoundPage />,
  //   },
  // ]);
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      ),
      handle: { breadcrumb: "داشبورد" },
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "portfolios",
          element: <PortfolioPage />,
          handle: { breadcrumb: "سبدها" },
        },
        {
          path: "portfolios/:id",
          element: <PortfolioDetails />,
          // loader: portfolioLoader,
          handle: { breadcrumb: (data) => data?.name },
          children:[
            {path:"*",element:<PortfolioDetails />}
          ]
        },
        {
          path: "symbols",
          element: <SymbolsPage />,
          handle: { breadcrumb: "نمادها" },
        },
        {
          path: "watch_list",
          element: <WatchList />,
        },
        {
          path: "watch_list_weekly",
          element: <WatchListWeekly />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "settings",
          element: <Settings />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);

  return (
    // <>
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Login />} />
    //     <Route
    //       path="/dashboard"
    //       element={
    //         <ProtectedRoute>
    //           <DashboardLayout />
    //         </ProtectedRoute>
    //       }
    //     >
    //       <Route index element={<Dashboard />} />
    //       <Route path="portfolios" element={<PortfolioPage />} />
    //       <Route path="portfolios/:id/:slug" element={<PortfolioDetails />} />
    //       <Route path="symbols" element={<SymbolsPage />} />
    //       <Route path="*" element={<NotFoundPage />} />
    //     </Route>
    //   </Routes>
    // </BrowserRouter>
    // </>
    <RouterProvider router={router}  />
  );
}

export default App;
