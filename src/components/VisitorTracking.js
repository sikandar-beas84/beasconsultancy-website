"use client";

import { useEffect } from "react";
import { trackVisitor } from "@/util/visitorTracking";

export default function VisitorTracking() {

    useEffect(() => {

        trackVisitor();

    }, []);

    return null;
}