import { useRef, useState } from 'react';
import './LudoBoard.css';

export default function LudoBoard() {
    const [rotation, setRotation] = useState(60);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const startRotate = (direction: 'left' | 'right') => {
        if (intervalRef.current) return;

        intervalRef.current = setInterval(() => {
            setRotation(prev => prev + (direction === 'left' ? -5 : 5));
        }, 100);
    };

    const stopRotate = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    return (
        <div className="container">
            <div className="controls">
                <button
                    onMouseDown={() => startRotate('left')}
                    onMouseUp={stopRotate}
                    onMouseLeave={stopRotate}
                    onTouchStart={() => startRotate('left')}
                    onTouchEnd={stopRotate}
                >
                    {"<"}
                </button>
                <button
                    onMouseDown={() => startRotate('right')}
                    onMouseUp={stopRotate}
                    onMouseLeave={stopRotate}
                    onTouchStart={() => startRotate('right')}
                    onTouchEnd={stopRotate}
                >
                    {">"}
                </button>
            </div>
            <div
                className="board"
                style={{
                    transform: `rotateY(0deg) rotateX(65deg) rotateZ(${rotation}deg)`
                }}
            >
                {Array.from({ length: 361 }, (_, i) => (
                    <div key={i} className={`cell ${getColor(i)}`}>
                        {/* {i + 1} */}
                    </div>
                ))}
            </div>
        </div>
    );
}
type RGB = 'red' | 'green' | 'blue' | 'yellow' | 'black' | 'gray';

const cores: { [key: string]: string } = {
  '16,1': 'black',
  '16,2': 'black',
  '17,2': 'black',
  '3,3': 'yellow',
  '5,3': 'black',
  '7,3': 'green',
  '8,3': 'red',
  '9,3': 'yellow',
  '11,3': 'black',
  '13,3': 'green',
  '14,3': 'red',
  '15,3': 'yellow',
  '3,4': 'red',
  '13,4': 'red',
  '3,5': 'green',
  '4,5': 'red',
  '5,5': 'yellow',
  '9,5': 'black',
  '11,5': 'green',
  '12,5': 'red',
  '13,5': 'yellow',
  '15,5': 'black',
  '5,6': 'red',
  '3,7': 'black',
  '5,7': 'green',
  '9,7': 'yellow',
  '15,7': 'green',
  '15,8': 'red',
  '3,9': 'yellow',
  '5,9': 'black',
  '7,9': 'yellow',
  '11,9': 'yellow',
  '13,9': 'black',
  '15,9': 'yellow',
  '3,10': 'red',
  '9,10': 'black',
  '3,11': 'green',
  '9,11': 'yellow',
  '13,11': 'green',
  '15,11': 'black',
  '13,12': 'red',
  '3,13': 'black',
  '5,13': 'yellow',
  '6,13': 'red',
  '7,13': 'green',
  '9,13': 'black',
  '13,13': 'yellow',
  '14,13': 'red',
  '15,13': 'green',
  '5,14': 'red',
  '15,14': 'red',
  '3,15': 'yellow',
  '4,15': 'red',
  '5,15': 'green',
  '7,15': 'black',
  '9,15': 'yellow',
  '10,15': 'red',
  '11,15': 'green',
  '13,15': 'black',
  '1,16': 'black',
  '16,16': 'black',
  '17,16': 'red',
  '17,17': 'red'
}

function getColor(index: number): string {
    const x = index % 19;
  const y = Math.floor(index / 19);
  const key = `${x},${y}`;
  return cores[key] ?? 'gray';
}
