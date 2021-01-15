import "./App.css";
import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/navBar";
import MarketPlace from "./pages/MarketPlace";
import BackOffice from "./pages/BackOffice";
import Footer from "./components/footer";
import ProductPage from "./pages/productPage";

function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setProducts(products);
  }, [products]);
  return (
    <div className='App'>
      <Router>
        <NavBar setProducts={setProducts} />
        <Route path='/backoffice' exact>
          <BackOffice />
        </Route>
        <Route path='/market/:id' exact>
          <ProductPage />
        </Route>
        <Route path='/' component={(props) => <MarketPlace products={products} {...props} />} exact />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
