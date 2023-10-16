import ReactDOM from 'react-dom/client';

import { App }  from '@adapters/views/App';

import './index.css';

const root = ReactDOM.createRoot(document.querySelector('#root')!);

root.render(<App />);
