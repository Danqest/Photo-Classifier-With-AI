import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Categories from './pages/Categories';
// import Detail from './pages/Detail';
// import NoMatch from './pages/NoMatch';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
// import Nav from './components/Nav';
import { StoreProvider } from './utils/GlobalState';
// import Success from './pages/Success';
// import OrderHistory from './pages/OrderHistory';
import Header from './components/Header/Header';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  
  return (
      <ApolloProvider client={client}>
      <Router>
        <div className='App'>
        {/* <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={'/sign-in'}>
              PhotoClass
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-in'}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-up'}>
                    Sign up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav> */}
        {/* <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<Signup />} />
            </Routes>
          </div> */}
        
          
            <Header />
          
          
          <StoreProvider>
            
            <Routes>
              <Route 
                path="/categories" 
                element={<Categories />} 
              />
              <Route 
                path="/login" 
                element={<Login />} 
              />
              {/* <Route 
                path="/signup" 
                element={<Signup />} 
              />
              {/* <Route 
                path="/success" 
                element={<Success />} 
              /> */}
              {/* <Route 
                path="/orderHistory" 
                element={<OrderHistory />} 
              /> */}
              {/* <Route 
                path="/products/:id" 
                element={<Detail />} 
              /> */}
              {/* <Route 
                path="*" 
                element={<NoMatch />} 
              /> */}
            </Routes>
          </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
