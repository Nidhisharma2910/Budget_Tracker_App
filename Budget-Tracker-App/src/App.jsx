import {Routes,Route} from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/Login';
import AuthenticationComponent from './components/AuthenticationComponent'
import Home from './components/Home';
import Profile from './components/Profile';
import CreateTransaction from './components/CreateTransaction';
import ShowTransaction from './components/ShowTransaction';
import ShowCharts from './components/ShowCharts';

function App() {
  console.log("Helloe")
  return (
    <Routes>
      <Route element={<AuthenticationComponent/>}>
        <Route path='' element={<Registration/>}/>
        <Route path='/login' element={<Login/>}/>
      </Route>
      <Route element={<Home/>}>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/createtransaction' element={<CreateTransaction/>}/>
        <Route path='/showtransaction' element={<ShowTransaction/>}/>
        <Route path='/showcharts' element={<ShowCharts/>}/>
      </Route>
    </Routes>
  )
}

export default App
