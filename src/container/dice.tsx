import React, { useState, useRef } from 'react';
import './dice.css';

const getRandomInt = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

type DiceFace = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export const Dice: React.FC = () => {
    const [rotation, setRotation] = useState({ x: 60, y: 0 });
    const [translateY, setTranslateY] = useState(0);
    const [faceUp, setFaceUp] = useState<DiceFace>(1);
    const [isAnimating, setIsAnimating] = useState(false);

    const animationRef = useRef<number | null>(null);

    const throwDice = () => {
        if (isAnimating) return;
        setIsAnimating(true);

        let bounces = 0;
        const maxBounces = 4;

        let velocityY = 25;
        const gravity = 1;
        const bounceDamping = 0.5;

        let posY = 0;

        let rotX = rotation.x;
        let rotY = rotation.y;

        const randomSpinX = getRandomInt(720, 1440);
        const randomSpinY = getRandomInt(720, 1440);

        const totalFrames = 60;
        const spinStepX = randomSpinX / (totalFrames * maxBounces);
        const spinStepY = randomSpinY / (totalFrames * maxBounces);

        const animate = () => {
            rotX += spinStepX;
            rotY += spinStepY;

            posY += velocityY;
            velocityY -= gravity;

            if (posY <= 0) {
                posY = 0;
                bounces++;

                if (bounces >= maxBounces) {
                    finalize(rotX, rotY);
                    return;
                }

                velocityY = velocityY * -bounceDamping;
            }

            setRotation({ x: rotX, y: rotY });
            setTranslateY(-posY);

            animationRef.current = requestAnimationFrame(animate);
        };

        const finalize = (finalX: number, finalY: number) => {
            const normalizedX = Math.round(finalX / 90) * 90;
            const normalizedY = Math.round(finalY / 90) * 90;

            const nx = (normalizedX % 360 + 360) % 360;
            const ny = (normalizedY % 360 + 360) % 360;

            let result: DiceFace = 0;
            if (nx === 0 && ny === 0 || nx === 180 && ny === 180) result = 1;//0/0:2, 180/180:4 ou 5
            else if (nx === 0 && ny === 180 || nx === 180 && ny === 0) result = 6;//180/0:5, 0/180:2
            else if (nx === 0 && ny === 270 || nx === 180 && ny === 90) result = 3;//180/90:5, 0/270:2
            else if (nx === 90) result = 2;//90/0:6, 90/90:3, 90/180:1, 90/270:4
            else if (nx === 180 || nx === 0 && ny === 90) result = 4;//180/270:5, 0/90:2
            else if (nx === 270) result = 5;//270/0:1, 270/90:4, 270/180:6, 270/270:3

            // Face 0: 0.0% (nunca ocorre)
            // Face 1: 12.5% (2/16 combinações)
            // Face 2: 25.0% (4/16 combinações) ⚠️ Favorecida
            // Face 3: 12.5% (2/16 combinações)
            // Face 4: 12.5% (2/16 combinações)
            // Face 5: 25.0% (4/16 combinações) ⚠️ Favorecida
            // Face 6: 12.5% (2/16 combinações)

            setFaceUp(result);
            setTranslateY(0);
            setIsAnimating(false);

            // Ajuste final: mantemos o mesmo Y e fazemos X += 60
            setRotation({ x: normalizedX + 60, y: normalizedY });
        };

        animate();
    };

    return (
        <div className="scene">
            <div
                className="cube"
                style={{
                    transform: `
                        translateY(${translateY}px)
                        rotateX(${rotation.x}deg)
                        rotateY(${rotation.y}deg)
                    `,
                    transition: isAnimating ? 'none' : 'transform 0.5s ease-out'
                }}
                onClick={throwDice} 
            >
                <div className="face one">1</div>
                <div className="face two">2</div>
                <div className="face three">3</div>
                <div className="face four">4</div>
                <div className="face five">5</div>
                <div className="face six">6</div>
            </div>
            <div>{JSON.stringify(faceUp)}</div>
            {/* <p>Face up: {faceUp}</p>
            <div>{JSON.stringify(nxa)}</div>
            <div>{JSON.stringify(nya)}</div> */}
        </div>
    );
};