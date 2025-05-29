import { useRef, useState } from 'react';
import './ludoBoard.css';

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
                        {/* {i} */}
                        {i === 71 && 'M' || i === 79 && 'M' || i == 281 && 'M' || i == 289 && 'M'}
                        {i === 62 && '💀' || i === 110 && '💀' || i === 250 && '💀' || i === 298 && '💀'}
                    </div>
                ))}
            </div>
        </div>
    );
}

const cores: { [key: string]: string } = {
    '0,3': 'blue',
    '0,4': 'black',
    '0,5': 'white',
    '0,6': 'yellow',
    '0,7': 'red',
    '0,8': 'green',
    '0,9': 'blue',
    '0,10': 'black',
    '0,11': 'white',
    '0,12': 'yellow',
    '0,13': 'red',
    '0,14': 'green',
    '0,15': 'blue',
    '1,15': 'black',
    '2,15': 'white',
    '3,15': 'yellow',
    '3,16': 'red',
    '3,17': 'green',
    '3,18': 'blue',
    '4,18': 'black',
    '5,18': 'white',
    '6,18': 'yellow',
    '7,18': 'red',
    '8,18': 'green',
    '9,18': 'blue',
    '10,18': 'black',
    '11,18': 'white',
    '12,18': 'yellow',
    '13,18': 'red',
    '14,18': 'green',
    '15,18': 'blue',
    '15,17': 'black',
    '15,16': 'white',
    '15,15': 'yellow',
    '16,15': 'red',
    '17,15': 'green',
    '18,15': 'blue',
    '18,14': 'black',
    '18,13': 'white',
    '18,12': 'yellow',
    '18,11': 'red',
    '18,10': 'green',
    '18,9': 'blue',
    '18,8': 'black',
    '18,7': 'white',
    '18,6': 'yellow',
    '18,5': 'red',
    '18,4': 'green',
    '18,3': 'blue',
    '17,3': 'black',
    '16,3': 'white',
    '15,3': 'yellow',
    '15,2': 'red',
    '15,1': 'green',
    '15,0': 'blue',
    '14,0': 'black',
    '13,0': 'white',
    '12,0': 'yellow',
    '11,0': 'red',
    '10,0': 'green',
    '9,0': 'blue',
    '8,0': 'black',
    '7,0': 'white',
    '6,0': 'yellow',
    '5,0': 'red',
    '4,0': 'green',
    '3,0': 'blue',
    '3,1': 'black',
    '3,2': 'white',
    '3,3': 'yellow',

    '2,3': 'red',
    '1,3': 'green',
    
    //INTERNAL
    '3,4': 'red',
    '3,5': 'green',
    '3,6': 'blue',
    '3,7': 'black',
    '3,8': 'white',
    '3,9': 'yellow',
    '3,10': 'red',
    '3,11': 'green',
    '3,12': 'blue',
    '3,13': 'black',
    '4,13': 'white',
    '5,13': 'yellow',
    '6,13': 'red',
    '7,13': 'green',
    '8,13': 'blue',
    '9,13': 'black',

    '9,12': 'white',
    '9,11': 'yellow',

    '4,15': 'red',
    '5,15': 'green',
    '6,15': 'blue',
    '7,15': 'black',
    '8,15': 'white',
    '9,15': 'yellow',
    '10,15': 'red',
    '11,15': 'green',
    '12,15': 'blue',
    '13,15': 'black',
    '13,14': 'white',
    '13,13': 'yellow',
    '13,12': 'red',
    '13,11': 'green',
    '13,10': 'blue',
    '13,9': 'black',

    '12,9': 'white',
    '11,9': 'yellow',

    '15,14': 'red',
    '15,13': 'green',
    '15,12': 'blue',
    '15,11': 'black',
    '15,10': 'white',
    '15,9': 'yellow',
    '15,8': 'red',
    '15,7': 'green',
    '15,6': 'blue',
    '15,5': 'black',
    '14,5': 'white',
    '13,5': 'yellow',
    '12,5': 'red',
    '11,5': 'green',
    '10,5': 'blue',
    '9,5': 'black',

    '9,6': 'white',
    '9,7': 'yellow',

    '14,3': 'red',
    '13,3': 'green',
    '12,3': 'blue',
    '11,3': 'black',
    '10,3': 'white',
    '9,3': 'yellow',
    '8,3': 'red',
    '7,3': 'green',
    '6,3': 'blue',
    '5,3': 'black',
    '5,4': 'white',
    '5,5': 'yellow',
    '5,6': 'red',
    '5,7': 'green',
    '5,8': 'blue',
    '5,9': 'black',

    '6,9': 'white',
    '7,9': 'yellow',

    //CENTER
    '8,8': 'white',
    '8,9': 'white',
    '8,10': 'white',
    '9,8': 'white',
    '9,9': 'white',
    '9,10': 'white',
    '10,8': 'white',
    '10,9': 'white',
    '10,10': 'white',
}

function getColor(index: number): string {
    const x = index % 19;
    const y = Math.floor(index / 19);
    const key = `${x},${y}`;
    return cores[key];
}