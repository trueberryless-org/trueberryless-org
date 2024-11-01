import { useEffect, useState } from "react";

export default function useTouch() {
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    function checkTouchDevice() {
        return (
            "ontouchstart" in window ||
            navigator.maxTouchPoints > 0 ||
            navigator.msMaxTouchPoints > 0
        );
    }

    useEffect(() => {
        const hasTouch = checkTouchDevice();
        setIsTouchDevice(hasTouch);
    }, []);

    return isTouchDevice;
}
