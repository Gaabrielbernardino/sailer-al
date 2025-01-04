import { BrowserRouter, Route, Routes } from 'react-router';
import Chats from './pages/Chats/Chats';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chats />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
