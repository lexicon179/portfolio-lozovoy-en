import { Route, Routes } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollManager from './components/ScrollManager';
import Home from './pages/Home';
import Projects from './pages/Projects';
import CasePage from './pages/CasePage';
import NotFound from './pages/NotFound';

/**
 * Vercel Web Analytics: скрипт отдаётся с того же домена (/_vercel/insights),
 * внешних запросов нет. В локальной сборке для file:// его нет — там
 * сервера Vercel нет, скрипт бы не загрузился.
 */
const withAnalytics = !import.meta.env.VITE_FILE_BUILD;

export default function App() {
  return (
    <>
      <ScrollManager />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/case/:slug" element={<CasePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      {withAnalytics && <Analytics />}
    </>
  );
}
