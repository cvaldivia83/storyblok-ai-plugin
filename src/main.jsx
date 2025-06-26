import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/900.css';
import { apiPlugin, storyblokInit } from '@storyblok/react';
import { createRoot } from 'react-dom/client';
import App from './App';
import Fallback from './components/Fallback';
import Hero from './components/Hero';
import Page from './components/Page';
import WhyUs from './components/WhyUs';
import FeatureItem from './components/FeatureItem';
import Cta from './components/Cta';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Tool from './pages/Tool';


storyblokInit({
  accessToken: import.meta.env.VITE_STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  apiOptions: {
    region: 'eu',   
  }, 
  components: {
    page: Page,
    Hero: Hero,
    WhyUs: WhyUs,
    FeatureItem: FeatureItem,
    cta: Cta,
    fallback: Fallback,
  }
});

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <App /> } />
        <Route path="/start" element={ <Tool /> } />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
   
 
)
