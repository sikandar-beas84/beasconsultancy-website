import { getDataService, postService, postServiceData } from '@/apiservices/service';
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
    
    const {slug} = await params;
    
    const serviceData = await postService('get-seo-by-slug', slug);
    const seometadata = serviceData?.data?.seometa;
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
    console.error('Error generating metadata:', error);
    return {
      title: "Home",
      description: "Learn about our 25+ years of IT consulting expertise, client stories, and services.",
    };
  }
}

const page = async ({ params }) => {
  try {
    const {slug} = await params

    // Fetch all required data
    const [clientsData, servicesData] = await Promise.all([
      getDataService('get-clients'),
      getDataService('get-menu-services')
    ]);

    const allclient = clientsData?.data?.clients;
    const services = servicesData?.data?.services?.children;

    // Validate services data
    if (!services || !Array.isArray(services)) {
      console.error('Invalid services data received:', services);
      return <div>Unable to load services data. Please try again later.</div>;
    }

    // Find the specific service based on slug
    const findService = (servicesList, serviceSlug) => {
      if (!servicesList || !Array.isArray(servicesList)) return null;

      const appSlugs = [
        "application-development",
        "application-maintenance",
        "ui-ux",
        "professional-services",
      ];

      let foundService = null;

      if (appSlugs.includes(serviceSlug)) {
        // Find parent "application-solutioning" first
        const parent = servicesList.find(s => s && s.slug === "application-solutioning");
        if (parent && parent.children && Array.isArray(parent.children)) {
          foundService = parent.children.find(c => c && c.slug === serviceSlug);
        }
      } else {
        // Direct service lookup
        foundService = servicesList.find(s => s && s.slug === serviceSlug);
      }

      return foundService || null;
    };

    const service = findService(services, slug);

    if (!service) {
      return <div>Service not found</div>;
    }

    // Enrich children with case studies data on the server
    const enrichChildrenWithCaseStudies = async (children) => {
      if (!children || !Array.isArray(children)) return [];

      const enriched = await Promise.all(
        children.map(async (child) => {
          const contents = child?.menu_contents?.contents || [];
          
          let enrichedContents = [];
          
          if (Array.isArray(contents) && contents.length > 0) {
            enrichedContents = await Promise.all(
              contents.map(async (content) => {
                if (!content.extra_description) return content;
                try {
                  const data = await postServiceData(
                    "get-casestudy-by-slug",
                    env.ACCESS_TOKEN,
                    content.extra_description
                  );
                  return { ...content, casestudy: data };
                } catch (error) {
                  console.error('Error fetching case study for slug:', content.extra_description, error);
                  return content;
                }
              })
            );
          }

          return {
            ...child,
            menu_contents: {
              ...child.menu_contents,
              contents: enrichedContents,
            },
          };
        })
      );

      return enriched;
    };

    const enrichedChildren = await enrichChildrenWithCaseStudies(service.children);

    // Log for debugging

    // Prepare the props for the client component
    const serviceProps = {
      slug,
      allclient,
      services,
      initialService: service,
      initialEnrichedChildren: enrichedChildren
    };

    return (
      <div>
        <Servicebody {...serviceProps} />
      </div>
    );

  } catch (error) {
    console.error('Error in service page:', error);
    return <div>An error occurred while loading the page. Please try again later.</div>;
  }
}

export default page;