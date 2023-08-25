import './App.css';
import { Route, Routes, Router } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import InputComponent from './Components/common/Input';
import Profile from './pages/Profile';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';
import { useDispatch } from 'react-redux';
import { setUser } from './slices/userSlice';
import PrivateRoutes from './Components/common/PrivateRoutes';
import CreateAPodcast from './pages/CreateAPodcast';


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const unsubscribeSnapshot = onSnapshot(
          doc(db, "users", user.uid),
          (userDoc) => {
            if (userDoc.exists()) {
              const userData = userDoc.data();
              dispatch(setUser({
                name: userData.name,
                email: userData.email,
                uid: user.uid
              })
              );
            }
          },
          (error) => {
            console.log(error);
          }
        );
        return () => {
          unsubscribeSnapshot();
        }
      }
    }
    );
    return () => {
      unsubscribeAuth()
    };
  }, [])

  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path='/' element={<SignUpPage />} />
        <Route element={<PrivateRoutes />}>
          <Route path='profile' element={<Profile />} />
          <Route path='create-a-podcast' element={<CreateAPodcast />} />

        </Route>

      </Routes>

    </div>
  );
}

export default App;
