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

function getColor(index: number): string {
    // if (index < 4) return 'red';
    // if (index >= 12) return 'blue';
    // if (index % 4 === 0) return 'yellow';
    // if (index % 4 === 3) return 'green';
    return 'gray';
}
