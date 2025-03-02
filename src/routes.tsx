import { Route, Routes } from 'react-router';
import { Home } from './pages/Home/Home';
import { Timer } from './pages/Timer';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Timer" element={<Timer />} />
    </Routes>
  );
}