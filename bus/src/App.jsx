import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Mainpage from "./Components/MainPage";
import BusResults from "./Components/BusResults";
import BusBooking from "./Components/BusBooking";
import PaymentPage from "./Components/PaymentPage";
import BusRoutePage from "./Components/BusAnimation";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import BusAnimation from "./Components/BusAnimation";

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/Mainpage",
      element: <Mainpage />,
    },
    {
      path: "/results",
      element: <BusResults />,
    },
    {
      path: "/bus-booking/:id",
      element: <BusBooking />,
    },
    {
      path: "/payment",
      element: <PaymentPage />,
    },
    {
      path: "/bus-route/:id",
      element: <BusAnimation />,
    }
  ]);

  return (
    <div className="App">
      <RouterProvider router={route} />
    </div>
  );
}

export default App;
