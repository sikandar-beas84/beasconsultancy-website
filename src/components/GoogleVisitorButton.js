"use client";

import { useEffect, useState } from "react";
import { env } from "@/util/constants/common";
import { getVisitorUUID } from "@/util/visitorTracking";

const API_URL = env.API_BASE_URL;

export default function GoogleVisitorButton() {

    const [showButton, setShowButton] = useState(false);
    const [checking, setChecking] = useState(true);

    useEffect(() => {

        const checkGoogleLogin = async () => {

            try {

                const visitorUUID = getVisitorUUID();

                if (!visitorUUID) {
                    setShowButton(true);
                    setChecking(false);
                    return;
                }

                const response = await fetch(
                    `${API_URL}visitor/google-status?visitor_uuid=${encodeURIComponent(visitorUUID)}`
                );

                if (!response.ok) {
                    throw new Error("Unable to check Google login status");
                }

                const data = await response.json();

                if (data.logged_in) {
                    // Already logged in
                    setShowButton(false);
                } else {
                    // Not logged in
                    setShowButton(true);
                }

            } catch (error) {

                console.error(
                    "Google login status check failed:",
                    error
                );

                // If API fails, show the button
                setShowButton(true);

            } finally {

                setChecking(false);

            }
        };

        checkGoogleLogin();

    }, []);


    const handleGoogleLogin = () => {

        const visitorUUID = getVisitorUUID();

        if (!visitorUUID) {
            alert("Unable to identify visitor.");
            return;
        }

        const url =
            `${API_URL}` +
            `auth/google?visitor_uuid=${encodeURIComponent(visitorUUID)}`;

        window.location.href = url;
    };


    // Don't show anything while checking
    if (checking) {
        return null;
    }

    // Already logged in
    if (!showButton) {
        return null;
    }


    return (
        <button
            type="button"
            onClick={handleGoogleLogin}
        >
            Continue with Google
        </button>
    );
}