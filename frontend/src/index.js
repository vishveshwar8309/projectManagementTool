import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import { Provider } from 'react-redux';
import "bootstrap/dist/css/bootstrap.min.css"
import './index.css';
import App from './App';
import store from './store';
import UnloggedScreen from './screens/UnloggedScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import Private from './components/Private';
import HomeScreen from './screens/HomeScreen';
import CreateProjectScreen from './screens/managerScreens/CreateProjectScreen';
import Manager from './components/Manager';
import ProjectTraceScreen from './screens/ProjectTraceScreen';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<UnloggedScreen />} />
      <Route path='/signin' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />

      <Route path='' element={<Private />}>
        <Route path='/projectmanagementtool' element={<HomeScreen />} />
        <Route path='/projectmanagementtool/project/:id' element={<ProjectTraceScreen />} />
      </Route>

      <Route path='' element={<Manager />}>
        <Route path='/projectmanagementtool/manager/:id/createproject' element={<CreateProjectScreen />} />
      </Route>
    </Route>

  )
)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
