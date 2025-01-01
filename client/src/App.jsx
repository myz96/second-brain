import { Route, Routes } from "react-router-dom";

import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes redirectTo="/login" />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
