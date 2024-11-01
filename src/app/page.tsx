"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useTouch from "../hooks/useTouch";

export default function Home() {
    const isTouchDevice = useTouch();
    const router = useRouter();

    useEffect(() => {
        if (isTouchDevice) {
            router.push("/mobile");
        } else {
            router.push("/desktop");
        }
    }, [isTouchDevice, router]);

    return null; // No content, as it redirects immediately
}
