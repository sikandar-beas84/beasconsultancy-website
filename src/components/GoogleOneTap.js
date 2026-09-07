"use client";
import { useEffect, useRef } from "react";
const GOOGLE_CLIENT_ID =
"102808869265-nu4k4nueh88qjuuu7ubhph47hggdpc4i.apps.googleusercontent.com";
const API_URL =
"https://www.api.beasconsultancy.com/api";
export default function GoogleOneTap() {
const initialized = useRef(false);
useEffect(() => {
if (initialized.current) {
return;
}
const loadGoogle = () => {
if (
!window.google ||
!window.google.accounts ||
!window.google.accounts.id
) {
console.error(
"Google Identity Services not available"
);
return;
}
if (initialized.current) {
return;
}
initialized.current = true;
/*
 * Initialize Google Identity Services
 */
window.google.accounts.id.initialize({
client_id: GOOGLE_CLIENT_ID,
callback: handleGoogleCredential,
use_fedcm_for_button: true,
button_auto_select: true,
});
/*
 * Create hidden Google Sign-In button
 */
const container =
document.createElement("div");
container.id =
"google-signin-hidden";
container.style.position =
"fixed";
container.style.left =
"-9999px";
container.style.top =
"-9999px";
container.style.width =
"1px";
container.style.height =
"1px";
container.style.opacity =
"0";
document.body.appendChild(
container
);
/*
 * Render Google button
 */
window.google.accounts.id.renderButton(
container,
{
type: "standard",
theme: "outline",
size: "large",
}
);
/*
 * Automatically click Google button
 */
setTimeout(() => {
const googleButton =
container.querySelector(
'[role="button"]'
);
if (googleButton) {
console.log(
"Triggering Google Sign-In..."
);
googleButton.click();
} else {
console.log(
"Google button not found"
);
}
}, 500);
};
/*
 * Check whether Google GIS script
 * already exists
 */
const existingScript =
document.querySelector(
'script[src="https://accounts.google.com/gsi/client"]'
);
if (existingScript) {
if (
window.google?.accounts?.id
) {
loadGoogle();
} else {
    existingScript.addEventListener(
    "load",
    loadGoogle
    );
    }
    return () => {
    existingScript.removeEventListener(
    "load",
    loadGoogle
    );
    };
    }
    /*
     * Load Google Identity Services
     */
    const script =
    document.createElement(
    "script"
    );
    script.src =
    "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload =
    loadGoogle;
    document.head.appendChild(
    script
    );
    return () => {
    script.removeEventListener(
    "load",
    loadGoogle
    );
};
}, []);
return null;
}
/*
 * Google returns the credential here.
 */
async function handleGoogleCredential(
response
) {
try {
console.log(
"Google credential received"
);
/*
 * Check credential
 */
if (
!response ||
!response.credential
) {
console.error(
"Google credential missing"
);
return;
}
/*
 * Get existing visitor UUID
 */
const visitorUUID =
getVisitorUUID();
console.log(
"Visitor UUID:",
visitorUUID
);
/*
 * Send Google credential
 * to Laravel
 */
const result =
await fetch(
`${API_URL}/auth/google/one-tap`,
{
method: "POST",
headers: {
"Content-Type":
"application/json",
"Accept":
"application/json",
},
body: JSON.stringify({
credential:
response.credential,
visitor_uuid:
visitorUUID,
}),
}
);
/*
 * Read Laravel response
 */
const data =
await result.json();
console.log(
"Laravel Google response:",
data
);
/*
 * Check Laravel error
 */
if (!result.ok) {
console.error(
"Google login failed:",
data
);
return;
}
/*
 * Login successful
 */
if (data.success) {
/*
 * Save authentication token
 */
if (data.token) {
localStorage.setItem(
"auth_token",
data.token
);
}
/*
 * Save user
 */
if (data.user) {
localStorage.setItem(
"user",
JSON.stringify(
data.user
)
);
}
console.log(
"Google login successful"
);
/*
 * Redirect home
 */
window.location.href =
"/";
}
} catch (error) {
    console.error(
        "Google login error:",
        error
        );
        }
        }
        /*
         * Get or create visitor UUID
         */
        function getVisitorUUID() {
        let uuid =
        localStorage.getItem(
        "visitor_uuid"
        );
        if (!uuid) {
        uuid =
        crypto.randomUUID();
        localStorage.setItem(
        "visitor_uuid",
        uuid
        );
        }
        return uuid;
        }
            