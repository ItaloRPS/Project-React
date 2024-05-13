import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import {ThemeProvider} from 'styled-components';
import {GlobalStyle} from './styles/styles-global'
import {theme} from './styles/theme'
import {RoutesPages} from './routes/routesPages';
import {AuthProvider} from './contexts/auth';

const metaViewport = document.createElement('meta');
metaViewport.setAttribute('name', 'viewport');
metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
document.head.appendChild(metaViewport);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <AuthProvider>
     <ThemeProvider theme={theme}>
     <BrowserRouter>
          <RoutesPages/>
      </BrowserRouter>
      <GlobalStyle/>
      </ThemeProvider>
   </AuthProvider>
);
