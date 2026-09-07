
import { env } from '@/util/constants/common';
const API_URL = env.API_BASE_URL;

const VISITOR_KEY = "company_visitor_uuid";

export function getVisitorUUID() {
    if (typeof window === "undefined") {
        return null;
    }

    let visitorUUID = localStorage.getItem(VISITOR_KEY);

    if (!visitorUUID) {
        visitorUUID = crypto.randomUUID();

        localStorage.setItem(
            VISITOR_KEY,
            visitorUUID
        );
    }

    return visitorUUID;
}

export async function trackVisitor() {

    if (typeof window === "undefined") {
        return;
    }

    const visitorUUID = getVisitorUUID();

    if (!visitorUUID) {
        return;
    }

    const params = new URLSearchParams(
        window.location.search
    );

    const data = {
        visitor_uuid: visitorUUID,
        page_url: window.location.href,
        page_title: document.title,
        referrer: document.referrer || null,

        utm_source: params.get("utm_source") || null,
        utm_medium: params.get("utm_medium") || null,
        utm_campaign: params.get("utm_campaign") || null,

        browser: getBrowser(),
        os: getOS(),
        device: getDevice(),
    };

    try {

        console.log("Sending visitor data:", data);

        const response = await fetch(
            `${API_URL}visitor/track`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },

                body: JSON.stringify(data),
            }
        );

        const result = await response.json();

        console.log(
            "Visitor tracking response:",
            response.status,
            result
        );

    } catch (error) {

        console.error(
            "Visitor tracking failed:",
            error
        );
    }
}

function getBrowser() {

    const userAgent = navigator.userAgent;

    if (userAgent.includes("Edg")) {
        return "Edge";
    }

    if (userAgent.includes("Chrome")) {
        return "Chrome";
    }

    if (userAgent.includes("Firefox")) {
        return "Firefox";
    }

    if (userAgent.includes("Safari")) {
        return "Safari";
    }

    return "Unknown";
}

function getOS() {

    const userAgent = navigator.userAgent;

    if (/Windows/i.test(userAgent)) {
        return "Windows";
    }

    if (/Mac/i.test(userAgent)) {
        return "MacOS";
    }

    if (/Android/i.test(userAgent)) {
        return "Android";
    }

    if (/iPhone|iPad/i.test(userAgent)) {
        return "iOS";
    }

    if (/Linux/i.test(userAgent)) {
        return "Linux";
    }

    return "Unknown";
}

function getDevice() {

    if (/Mobi|Android/i.test(navigator.userAgent)) {
        return "Mobile";
    }

    if (/Tablet|iPad/i.test(navigator.userAgent)) {
        return "Tablet";
    }

    return "Desktop";
}

export { getVisitorUUID };