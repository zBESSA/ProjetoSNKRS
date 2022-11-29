import './App.css';
import Logo from './componentes/template/Logo';
import Menu from './componentes/template/Menu';
import Footer from './componentes/template/Footer';
import Rotas from './Rotas';

import {BrowserRouter} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Logo />
        <Menu />
        <Rotas />
        <Footer />
      </div>
    </BrowserRouter>
   );
 }
 
 export default App