import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { env } from '@/util/constants/common';
const BreadCrumb = ({pagetitle, pageslug, pageBanner, totalCasestudy, checkSlugUndefined}) => {

  const bannerUrl = `${env.BACKEND_BASE_URL}${pageBanner}`;
  const bgStyle = {
    backgroundImage: `linear-gradient(rgba(14,19,51,0.5), rgba(14,19,51,0.5)), url(${bannerUrl})`
  };
  

  return (
    <section className="breadcrumbBg" style={bgStyle}>
      {/* {!checkSlugUndefined && ( */}
      <Container>
        <Row>
          <Col>
           <div className='breadcrumbWrap'>
             <div className='pageTitle'>{pagetitle}</div>
             <div className='pgNameListing'>
              <ul>
                
                {checkSlugUndefined && pageslug && <li style={{fontSize:35}}>{pageslug}</li>}
                
              </ul>
             </div>
             { totalCasestudy && !checkSlugUndefined &&
             <Row>
              <Col xs={12} className="position-relative">
                <p className="totalCasestudy">Case Study: <span>{totalCasestudy?.currentStudy}</span> / {totalCasestudy?.totalStudy}</p>
              </Col>
            </Row>
            }
           </div>
          </Col>
        </Row>
      </Container>
      {/* )} */}
    </section>
  )
}

export default React.memo(BreadCrumb);