import { AuthC } from "./context/AuthC";
import { SignIn } from "./pages/SignIn";
import Main from "./pages/Main";
import { BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import { useContext } from "react";

function App() {

  const {isUserLogged} = useContext(AuthC);

  return (
    <BrowserRouter>
      <Routes>
        {isUserLogged ? (
            <Route path="/m/*" element={<Main />} />
          ) : (
            <>
              <Route path="sign-in" element={<SignIn />} />
            </>
          )}
          <Route  
            path="*"
            element={<Navigate to={isUserLogged ? "m" : "sign-in"} />}
          />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
