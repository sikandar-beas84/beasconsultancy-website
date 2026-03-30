import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import { motion, AnimatePresence } from "framer-motion";
import { env } from '@/util/constants/common';
import Link from 'next/link';

const IndustriesProcess = ({pageTitle, pageDesc, industryData=[], slideSpeed = 5000, autoStart = true, animationDuration = 0.8}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(autoStart);
    const tabs = industryData;
    const activeTab = tabs[activeIndex];
    useEffect(() => {
        if (!isPlaying || tabs.length === 0) return;
        
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) =>
                prevIndex === tabs.length - 1 ? 0 : prevIndex + 1
            );
        }, slideSpeed);

        return () => clearInterval(interval);
    }, [tabs.length, isPlaying, slideSpeed]);

    // Control functions
    const play = () => setIsPlaying(true);
    const pause = () => setIsPlaying(false);
    const togglePlayPause = () => setIsPlaying(prev => !prev);
    const goToSlide = (index) => setActiveIndex(index);
    const nextSlide = () => setActiveIndex(prev => prev === tabs.length - 1 ? 0 : prev + 1);
    const prevSlide = () => setActiveIndex(prev => prev === 0 ? tabs.length - 1 : prev - 1);

    return (
        <>
            <div className="process">
                <div className="container">
                    <div className="port-hd-txt proc-hd">
                        <h2>{pageTitle}</h2>
                        <p>{pageDesc}</p>
                    </div>
                </div>
                
                <div className="process-inr">
                    <div className="container">
                        <div className="process-txt">
                            {/* Tabs on Left */}
                            <div className="tab">
                                {tabs?.map((tab, index) => (
                                    <button
                                        key={index}
                                        className={`tablinks ${index === activeIndex ? "activen" : ""}`}
                                        onClick={() => setActiveIndex(index)}
                                    >
                                        {index + 1}. {tab.name}
                                    </button>
                                ))}
                            </div>

                            {/* Right Content */}
                            <div className="tabcontent">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeIndex}
                                        className="proc-deet"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: animationDuration, ease: "easeInOut" }}
                                    >
                                        <div className="proc-img">
                                            <Image
                                                src={`${env.BACKEND_BASE_URL}assets/img/menu-content/${tabs[activeIndex]?.menu_contents?.image}`}
                                                alt={tabs[activeIndex]?.name??"Industries"}
                                                width={800}
                                                height={800}
                                                className="img-fluid"
                                                loading="lazy"
                                            />
                                        </div>

                                        <div className="proc-text">
                                            <h2>{tabs[activeIndex]?.name}</h2>
                                            <div className="grey-txt2 industries-hm-desc" dangerouslySetInnerHTML={{ __html: activeTab?.description }} />
                                            <Link href={`industries/${tabs[activeIndex]?.slug}`} className="mt-5 proc-btn thar-three4">
                                                Read More
                                            </Link>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default IndustriesProcess