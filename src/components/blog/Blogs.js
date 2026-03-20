"use client"
import React, { useState } from 'react'
import BreadCrumb from '../BreadCrumb';
import { Container, Col, Row } from 'react-bootstrap'
import Image from 'next/image';
import { env } from '@/util/constants/common';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Blogs = ({ blogs, commonblog }) => {
    const router = useRouter();
    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    const PER_PAGE = 6; // 👉 SET ITEMS PER PAGE
    const [currentPage, setCurrentPage] = useState(1);

    const totalBlogs = blogs?.length || 0;
    const totalPages = Math.ceil(totalBlogs / PER_PAGE);

    // Slice according to page
    const displayedBlogs = blogs.slice(
        (currentPage - 1) * PER_PAGE,
        currentPage * PER_PAGE
    );

    const goToPage = (pageNum) => setCurrentPage(pageNum);

    return (
        <>

            <main>
                <BreadCrumb pagetitle={commonblog?.title} pageBanner={`${commonblog?.image}`} />

                <Container className='pt-5'>
                    <Row>
                        <Col>
                            <div className="about_texts">
                                <h1>{commonblog?.short_desc}</h1>
                                <p>{commonblog?.long_desc}</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <section className="section-abuts section-services">
                    <div className="container">
                        <div className="row">
                            {displayedBlogs?.map((item, index) => {

                                const createdAtString = item?.created_at;
                                const created_at = createdAtString ? new Date(createdAtString) : null;
                                const day = created_at
                                    ? String(created_at.getDate()).padStart(2, "0")
                                    : "";
                                const month = created_at ? created_at.getMonth() + 1 : "";
                                const monthName = created_at
                                    ? new Intl.DateTimeFormat('en-US', { month: 'short' }).format(created_at)
                                    : "";
                                const year = created_at ? created_at.getFullYear() : "";

                                return (
                                    <div className="col-12 col-md-4" key={index}>
                                        <div>
                                            <Link
                                                href={`blogs/${item?.slug}`}

                                            >
                                                <div className="guiditem">
                                                    <div className="blog-hm-img">
                                                        <Image
                                                            src={`${env.BACKEND_BASE_URL}${item.image}`}
                                                            alt="blog"
                                                            width={400}
                                                            height={400}
                                                            priority
                                                            fetchPriority="high"
                                                            className="img-fluid port-shw"
                                                        />
                                                        <div className="guidcal">

                                                            <strong>{day}</strong> <br /><span>{monthName}</span>
                                                        </div>
                                                    </div>
                                                    <div className="guidtext">
                                                        <h5 className='blog-hm-title'>{item?.title}</h5>
                                                        <div className="blog-hm-desc" dangerouslySetInnerHTML={{ __html: item?.short_desc }}
                                                        ></div>
                                                        <div className="d-flex justify-content-center mt-35"><div className="post-job-btn">Read More</div></div>

                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                );

                            })}
                        </div>
                    </div>

                    {/* PAGINATION UI */}
                    <div className="pagination-wrapper mt-5 d-flex justify-content-center">
                        <ul className="pagination">

                            {/* PREV BUTTON */}
                            <li
                                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                                onClick={() => currentPage > 1 && goToPage(currentPage - 1)}
                            >
                                <span className="page-link">Prev</span>
                            </li>

                            {/* PAGE NUMBERS */}
                            {Array.from({ length: totalPages }, (_, i) => i + 1)?.map(num => (
                                <li
                                    key={num}
                                    className={`page-item ${currentPage === num ? "active" : ""}`}
                                    onClick={() => goToPage(num)}
                                >
                                    <span className="page-link">{num}</span>
                                </li>
                            ))}

                            {/* NEXT BUTTON */}
                            <li
                                className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
                                onClick={() => currentPage < totalPages && goToPage(currentPage + 1)}
                            >
                                <span className="page-link">Next</span>
                            </li>
                        </ul>
                    </div>



                </section>
            </main>
        </>
    );

}
export default Blogs