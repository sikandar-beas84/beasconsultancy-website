"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { trackVisitor } from "@/util/visitorTracking";

function VisitorTrackingContent() {
    const searchParams = useSearchParams();

    useEffect(() => {
        const utmSource = searchParams.get("utm_source");
        const utmMedium = searchParams.get("utm_medium");
        const utmCampaign = searchParams.get("utm_campaign");

        trackVisitor();
        
        console.log({
            utmSource,
            utmMedium,
            utmCampaign,
        });
    }, [searchParams]);

    return null;
}

export default function VisitorTracking() {
    return (
        <Suspense fallback={null}>
            <VisitorTrackingContent />
        </Suspense>
    );
}