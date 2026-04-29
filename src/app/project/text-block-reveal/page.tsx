import { Metadata } from 'next'
import projectInfo from "./project-information.json"
import { generateProjectMetadata } from '@/components/ProjectPageLayout'
import type { ProjectInfoType } from "@/types/project";
import TextPageClient from './TextPageClient'

const info = projectInfo as ProjectInfoType
const SLUG = "text-block-reveal"

export const metadata: Metadata = generateProjectMetadata(info)

const page = () => {
  return <TextPageClient info={info} slug={SLUG} />
}

export default page
