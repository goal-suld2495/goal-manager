import { Route, Routes } from 'react-router';
import MemoDetail from './pages/MemoDetail';
import MemoWrite from './pages/MemoWrite';

const App = () => {
  return (
    <Routes>
      <Route path="/write" element={<MemoWrite />} />
      <Route path="/memos/:id" element={<MemoDetail />} />
    </Routes>
  );
};

export default App;
