import logo from './logo.svg';
import {createBrowserRouter, RouterProvider, Route} from 'react-router-dom';
import Register from './pages/Register';
import Home from './pages/Home';
import Login from './pages/Login';
import SinglePost from './pages/SinglePost';
import WritePost from './pages/WritePost';
import Nav from './components/Nav';
import Footer from './components/Footer';

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>
      <Nav />
      <Home />
      <Footer />
    </div>
  },
  {
    path: "/login",
    element: <div>
        <Login />
      </div>
  },
  {
    path: "/register",
    element: <div>
      <Nav />
      <Register />
    </div>
  },
  {
    path: "/posts/:id",
    element: <div>
      <Nav />
      <SinglePost />
      <Footer />
    </div>
  },
  {
    path: "/writePost",
    element: <div>
      <Nav />
      <WritePost />
      <Footer />
    </div>
  }
])

function App() {
  return (
    <div className="App">
      <div className="container">
        <RouterProvider router={router}/>
      </div>
    </div>
  );
}

export default App;
