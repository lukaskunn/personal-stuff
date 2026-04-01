import { Metadata } from 'next'
import React from 'react'
import projectInfo from "./project-information.json"
import ProjectPageLayout, { generateProjectMetadata } from '@/components/ProjectPageLayout'
import type { ProjectInfoType } from "@/types/project";
import TextPageClient from './TextPageClient'

const info = projectInfo as ProjectInfoType
const SLUG = "text-block-reveal"

export const metadata: Metadata = generateProjectMetadata(info)

const page = () => {
  return (
    <ProjectPageLayout info={info} slug={SLUG}>
      <TextPageClient
        projectName={info.projectName}
        description={info.description}
        technologies={info.technologies}
        slug={SLUG}
        inspirationLink={info.inspirationLink}
        inspirationText={info.inspirationText}
      />
    </ProjectPageLayout>
  )
}

export default page