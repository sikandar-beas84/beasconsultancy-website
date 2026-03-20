import { getDataService, postService } from '@/apiservices/service';
import BreadCrumb from '@/components/BreadCrumb';
import React from 'react'
import { env } from '@/util/constants/common';
import Servicebody from '@/components/servicepage/Servicebody';

const flattenServices = (services, parentPath = '') => {
  if (!Array.isArray(services)) return [];

  return services.reduce((acc, service) => {
    const currentPath = parentPath
      ? `${parentPath} > ${service.name}`
      : service.name;

    // Add current service
    acc.push({
      index: acc.length + 1,
      id: service.id,
      name: service.name,
      slug: service.slug,
      parent_id: service.parent_id,
      level: parentPath.split(' > ').filter(Boolean).length,
      path: currentPath,
      description: service.description,
      menu_contents: service.menu_contents
    });

    // Recursively flatten children if they exist
    if (service.children && service.children.length > 0) {
      const childServices = flattenServices(service.children, currentPath);
      acc.push(...childServices);
    }

    return acc;
  }, []);
};
export async function generateMetadata({ params }) {
  try {
    const resolvedParams = await params;
    const slug = resolvedParams.service;
    const serviceData = await postService('get-seo-by-slug', slug);
    const seometadata = serviceData?.data?.seometa
    return {
      title: seometadata?.title || "Home",
      description: seometadata?.description || "Learn about our 25+ years of IT consulting expertise, client stories, and services.",
      keywords: seometadata?.keyword || "IT Consulting, Software Development, Digital Transformation, Business Solutions, Technology Partners, Beas Consultancy",
      authors: [{ name: seometadata?.author || "BEAS Consultancy And Services Private Limited" }],
      openGraph: {
        title: seometadata?.title || "Home",
        description: seometadata?.description || "Learn about our 25+ years of IT consulting expertise, client stories, and services.",
        images: seometadata?.image
          ? [`${env.BACKEND_BASE_URL}${seometadata?.image}`] : '',
        url: seometadata?.url
          ? `${env.FRONTEND_BASE_URL}${seometadata?.url}`
          : `${env.FRONTEND_BASE_URL}`,
      },
    };
  } catch (error) {

    return {
      title: "Home",
      description: "Learn about our 25+ years of IT consulting expertise, client stories, and services.",
    };
  }
}
const page = async ({ params }) => {
  const [serviceData, services] = await Promise.all([getDataService('get-clients'), getDataService('get-menu-services')]);
  const resolvedParams = await params;
  const slug = resolvedParams.service;


  return (
    <div>
      <Servicebody slug={slug} allclient={serviceData?.data?.clients} services={services?.data?.services?.children} />
    </div>
  )
}

export default page;