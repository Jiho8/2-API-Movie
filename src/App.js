import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Media from './pages/Media';
import Footer from './component/Footer';
import Header from './component/Header';
import DetailMovie from './pages/DetailMovie';
import DetailTv from './pages/DetailTv';
import './styles/_common.scss';

function App() {

  return (
    <Router>
      <Header />

      <main>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/:type' element={<Media/>}/>
          <Route path='/movie/:id' element={<DetailMovie/>}/>
          <Route path='/tv/:id' element={<DetailTv/>}/>
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
