import { useState } from 'react';
import './App.css';
import Carousel from './components/Carousel';
import Checkbox from './components/Checkbox';
import { GitHubLogo } from './assets/GithubLogo';

function App() {
    const [autoplay, setAutoplay] = useState<boolean>(true);
    const [cycle, setCycle] = useState<boolean>(true);
    const [timeInterval, setTimeInterval] = useState<number>(2);

    return (
        <div className='app'>
            <h1>Simple React Carousel</h1>
            <div className='checkbox-container flex-center'>
                <Checkbox
                    checked={autoplay}
                    label='Autoplay'
                    onChange={setAutoplay}
                    id='autoplay'
                />
                <Checkbox
                    checked={cycle}
                    label='Cycle'
                    onChange={setCycle}
                    id='cycle'
                />
                <label htmlFor='timeInterval'>
                    Time Interval{' '}
                    <input
                        type='number'
                        value={timeInterval}
                        min={1}
                        onChange={(e) => {
                            const parsedValue = parseInt(e.target.value);
                            if (parsedValue < 1 || !parsedValue) {
                                return;
                            }
                            setTimeInterval(parseInt(e.target.value));
                        }}
                        disabled={!autoplay}
                        name='Time Interval'
                        id='timeInterval'
                    />{' '}
                    (seconds)
                </label>
            </div>
            <Carousel
                autoplay={autoplay}
                cycle={cycle}
                timeInterval={timeInterval * 1000}
            />
            <footer className='footer'>
                <div className='flex-center'>
                    With 💜 by{' '}
                    <a href='//github.com/9a8ri3l' target='_blank'>
                        Gabriel
                    </a>{' '}
                </div>
                <a href='//github.com/9a8ri3l/react-carousel' target='_blank'>
                    <GitHubLogo size={26} color='var(--text-color)' />
                </a>
            </footer>
        </div>
    );
}

export default App;
