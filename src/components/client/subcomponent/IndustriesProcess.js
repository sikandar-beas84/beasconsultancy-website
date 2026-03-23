import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import { motion, AnimatePresence } from "framer-motion";
import { env } from '@/util/constants/common';
import Link from 'next/link';

const IndustriesProcess = ({pageTitle, pageDesc, industryData=[]}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const tabs = industryData;
    const activeTab = tabs[activeIndex];
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) =>
                prevIndex === tabs.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        return () => clearInterval(interval); // cleanup
    }, [tabs.length]);

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
                                        transition={{ duration: 0.8, ease: "easeInOut" }}
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