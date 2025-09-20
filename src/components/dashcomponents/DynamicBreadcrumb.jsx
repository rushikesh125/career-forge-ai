// components/DynamicBreadcrumb.jsx
"use client";

import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import Link from "next/link";

const DynamicBreadcrumb = () => {
  const pathname = usePathname();
  
  // Split pathname and remove empty segments
  const pathSegments = pathname.split("/").filter(segment => segment);

  // Capitalize and format segment names
  const formatSegment = (segment) => {
    return segment
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Generate breadcrumb items
  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
    const isLast = index === pathSegments.length - 1;
    
    return {
      name: formatSegment(segment),
      href,
      isLast,
    };
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink 
            href="/" 
            className="text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition-colors"
          >
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        {breadcrumbs.map((breadcrumb, index) => (
          <React.Fragment key={breadcrumb.href}>
            <BreadcrumbSeparator className="text-gray-400 dark:text-gray-500" />
            <BreadcrumbItem>
              {breadcrumb.isLast ? (
                <BreadcrumbPage className="text-gray-900 dark:text-gray-100 font-medium">
                  {breadcrumb.name}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink 
                  href={breadcrumb.href} 
                  className="text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition-colors"
                >
                  {breadcrumb.name}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DynamicBreadcrumb;