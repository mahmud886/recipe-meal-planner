import { useState } from 'react';
import './App.css';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='min-h-screen flex flex-col items-center justify-center text-emerald-950'>
      <div className='flex items-center justify-center gap-8 mb-8'>
        <a href='https://vite.dev' target='_blank' className='transition-transform duration-200 hover:-translate-y-1'>
          <img src={viteLogo} alt='Vite logo' className='h-24 w-24 drop-shadow-[0_0_40px_rgba(88,188,150,0.6)]' />
        </a>
        <a href='https://react.dev' target='_blank' className='transition-transform duration-200 hover:-translate-y-1'>
          <img src={reactLogo} alt='React logo' className='h-28 w-28 drop-shadow-[0_0_40px_rgba(74,222,128,0.6)]' />
        </a>
      </div>

      <h1 className='text-4xl font-semibold tracking-tight mb-6 text-emerald-950'>
        Vite <span className='text-emerald-500'>+</span> <span className='text-lime-500'>React</span>
      </h1>

      <div className='bg-white/70 border border-emerald-100 rounded-2xl px-8 py-6 shadow-xl flex flex-col items-center gap-4 backdrop-blur'>
        <button
          onClick={() => setCount((count) => count + 1)}
          className='px-6 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-medium shadow-md hover:shadow-lg transition-all duration-150'>
          count is {count}
        </button>
        <p className='text-emerald-900 text-sm'>
          Edit{' '}
          <code className='px-1.5 py-0.5 rounded bg-emerald-50 border border-emerald-100 text-xs'>src/App.tsx</code> and
          save to test HMR
        </p>
      </div>

      <p className='mt-6 text-xs text-emerald-800'>Click on the Vite and React logos to learn more</p>
    </div>
  );
}

export default App;
