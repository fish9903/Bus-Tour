import {useState} from 'react';

export const useSpinner = () => {
    const [active, setActive] = useState(false);

    const toggle = () => {
        setActive(prev => !prev);
    }

    const on = () => {
        setActive(true);
    }

    const off = () => {
        setActive(false);
    }

    return {
        active: active,
        turnOn: on,
        turnOff: off,
        toggle: toggle
    };
}