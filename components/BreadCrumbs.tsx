"use client"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
  
import { usePathname } from "next/navigation"
import { Fragment } from "react";

function BreadCrumbs() {
    const path = usePathname();
    const segments = path.split('/');

  return (
    <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      {segments.map((segment,idx)=>{
        if (!segment) return null;  
        const href = `${segments.slice(0,idx+1).join("/")}`;
        const isLast =  idx == segments.length-1;
        console.log(href);
        
        return(
        <Fragment key={segment}>
            <BreadcrumbSeparator/>
        <BreadcrumbItem>
        {isLast? (<BreadcrumbPage>{segment}</BreadcrumbPage>):(<BreadcrumbLink href={href}>{segment}</BreadcrumbLink>)}
            
        </BreadcrumbItem>
        </Fragment>)
      })}
    </BreadcrumbList>
  </Breadcrumb>
  )
}

export default BreadCrumbs
