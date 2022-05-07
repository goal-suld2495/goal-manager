import { ThemeProvider } from '@mui/system';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import App from './App';
import './index.css';
import theme from './theme';

ReactDOM.render(
  <RecoilRoot>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </RecoilRoot>,
  document.getElementById('root')
);
