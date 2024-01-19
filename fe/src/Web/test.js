import React, { useState } from 'react';
import Station from '../Openvidu/Station/Station.js'
import Fan from '../Openvidu/Fan/Fan.js'
import Artist from '../Openvidu/Artist/Artist.js'
export default function App() {
    const [flag, setFlag] = useState(3);

    const artistPage = () => setFlag(1);
    const fanPage = () => setFlag(2)
    const stationPage = () => setFlag(3)

    return (
        <div>
            <div>
                <button onClick={artistPage}>아티스트</button>
                <button onClick={fanPage}>팬</button>
                <button onClick={stationPage}>스테이션</button>
            </div>
            
            {flag === 1 && <Artist />}
            {flag === 2 && <Fan />}
            {flag === 3 && <Station />}
        </div>
    );
}
