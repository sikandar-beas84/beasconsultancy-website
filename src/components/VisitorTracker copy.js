"use client";

import { useEffect } from "react";

import { env } from '@/util/constants/common';
const API_URL = env.API_BASE_URL;

const VISITOR_COOKIE_NAME = "visitor_id";
const VISITOR_SESSION_KEY = "visitor_tracked";


// ---------------------------------------------------------
// Generate Visitor ID
// ---------------------------------------------------------
function generateVisitorId() {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
        return crypto.randomUUID();
    }

    return (
        Date.now().toString(36) +
        Math.random().toString(36).substring(2, 15)
    );
}


// ---------------------------------------------------------
// Get Cookie
// ---------------------------------------------------------
function getCookie(name) {

    if (typeof document === "undefined") {
        return null;
    }

    const cookies = document.cookie.split("; ");

    for (const cookie of cookies) {

        const [key, ...value] = cookie.split("=");

        if (key === name) {
            return decodeURIComponent(value.join("="));
        }
    }

    return null;
}


// ---------------------------------------------------------
// Set Cookie
// ---------------------------------------------------------
function setCookie(name, value, days = 365) {

    if (typeof document === "undefined") {
        return;
    }

    const expires = new Date();

    expires.setTime(
        expires.getTime() + days * 24 * 60 * 60 * 1000
    );

    let cookie =
        `${name}=${encodeURIComponent(value)}` +
        `; expires=${expires.toUTCString()}` +
        `; path=/` +
        `; SameSite=Lax`;

    // HTTPS production website
    if (window.location.protocol === "https:") {
        cookie += "; Secure";
    }

    document.cookie = cookie;
}


// ---------------------------------------------------------
// Get or Create Visitor ID
// ---------------------------------------------------------
function getVisitorId() {

    let visitorId = getCookie(VISITOR_COOKIE_NAME);

    if (!visitorId) {

        visitorId = generateVisitorId();

        setCookie(
            VISITOR_COOKIE_NAME,
            visitorId,
            365
        );
    }

    return visitorId;
}


// ---------------------------------------------------------
// Detect Device
// ---------------------------------------------------------
function getDeviceType() {

    const userAgent = navigator.userAgent.toLowerCase();

    if (/tablet|ipad/.test(userAgent)) {
        return "tablet";
    }

    if (
        /mobile|android|iphone|ipod|blackberry|iemobile|opera mini/.test(
            userAgent
        )
    ) {
        return "mobile";
    }

    return "desktop";
}


// ---------------------------------------------------------
// Detect Browser
// ---------------------------------------------------------
function getBrowser() {

    const userAgent = navigator.userAgent;

    if (/edg/i.test(userAgent)) {
        return "Edge";
    }

    if (/opr|opera/i.test(userAgent)) {
        return "Opera";
    }

    if (/chrome|crios/i.test(userAgent)) {
        return "Chrome";
    }

    if (/firefox|fxios/i.test(userAgent)) {
        return "Firefox";
    }

    if (/safari/i.test(userAgent) && !/chrome|crios/i.test(userAgent)) {
        return "Safari";
    }

    if (/msie|trident/i.test(userAgent)) {
        return "Internet Explorer";
    }

    return "Unknown";
}


// ---------------------------------------------------------
// Detect Operating System
// ---------------------------------------------------------
function getOperatingSystem() {

    const userAgent = navigator.userAgent;

    if (/windows nt/i.test(userAgent)) {
        return "Windows";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    if (/iphone|ipad|ipod/i.test(userAgent)) {
        return "iOS";
    }

    if (/mac os x/i.test(userAgent)) {
        return "macOS";
    }

    if (/linux/i.test(userAgent)) {
        return "Linux";
    }

    return "Unknown";
}


// ---------------------------------------------------------
// Get UTM Parameters
// ---------------------------------------------------------
function getUTMParameters() {

    const params = new URLSearchParams(
        window.location.search
    );

    return {
        utm_source: params.get("utm_source"),
        utm_medium: params.get("utm_medium"),
        utm_campaign: params.get("utm_campaign"),
        utm_term: params.get("utm_term"),
        utm_content: params.get("utm_content"),
    };
}


// ---------------------------------------------------------
// Send Visitor Data to Laravel
// ---------------------------------------------------------
async function sendVisitorData(
    latitude = null,
    longitude = null,
    accuracy = null
) {

    try {

        if (!API_URL) {

            console.error(
                "NEXT_PUBLIC_API_URL is not configured."
            );

            return;
        }


        const visitorId = getVisitorId();

        const utm = getUTMParameters();


        const visitorData = {

            visitor_id: visitorId,

            // GPS
            latitude: latitude,
            longitude: longitude,
            location_accuracy: accuracy,

            // Device
            device_type: getDeviceType(),
            browser: getBrowser(),
            os: getOperatingSystem(),

            // Website
            page_url: window.location.href,
            referrer: document.referrer || null,

            // Marketing
            utm_source: utm.utm_source,
            utm_medium: utm.utm_medium,
            utm_campaign: utm.utm_campaign,
            utm_term: utm.utm_term,
            utm_content: utm.utm_content,
        };


        const response = await fetch(
            `${API_URL}visitor/track`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },

                body: JSON.stringify(visitorData),
            }
        );


        if (!response.ok) {

            console.error(
                "Visitor tracking failed:",
                response.status
            );

            return;
        }


        const result = await response.json();

        console.log(
            "Visitor tracked:",
            result
        );

    } catch (error) {

        console.error(
            "Visitor tracking error:",
            error
        );
    }
}


// ---------------------------------------------------------
// Main Visitor Tracker
// ---------------------------------------------------------
export default function VisitorTracker() {

    useEffect(() => {

        // Only run in browser
        if (typeof window === "undefined") {
            return;
        }


        /*
        |--------------------------------------------------------------------------
        | Prevent duplicate tracking during same browser session
        |--------------------------------------------------------------------------
        */

        const alreadyTracked =
            sessionStorage.getItem(
                VISITOR_SESSION_KEY
            );


        if (alreadyTracked) {
            return;
        }


        /*
        |--------------------------------------------------------------------------
        | Mark as tracked
        |--------------------------------------------------------------------------
        */

        sessionStorage.setItem(
            VISITOR_SESSION_KEY,
            "1"
        );


        /*
        |--------------------------------------------------------------------------
        | Make sure visitor cookie exists
        |--------------------------------------------------------------------------
        */

        getVisitorId();


        /*
        |--------------------------------------------------------------------------
        | Request GPS Location
        |--------------------------------------------------------------------------
        */

        if (
            "geolocation" in navigator
        ) {

            navigator.geolocation.getCurrentPosition(

                // SUCCESS
                (position) => {

                    const latitude =
                        position.coords.latitude;

                    const longitude =
                        position.coords.longitude;

                    const accuracy =
                        position.coords.accuracy;


                    sendVisitorData(
                        latitude,
                        longitude,
                        accuracy
                    );
                },


                // ERROR / DENIED
                (error) => {

                    console.log(
                        "GPS location unavailable:",
                        error.message
                    );


                    // Still track visitor
                    // without GPS
                    sendVisitorData();
                },


                // OPTIONS
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 300000,
                }
            );

        } else {

            // Browser does not support GPS
            sendVisitorData();
        }

    }, []);


    // This component displays nothing
    return null;
}