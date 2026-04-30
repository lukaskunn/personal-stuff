import { Metadata } from 'next'
import projectInfo from "./project-information.json"
import { generateProjectMetadata } from '@/lib/projects'
import { loadProjectInfo } from '@/lib/projects';
import TextPageClient from './TextPageClient'

const info = loadProjectInfo(projectInfo)

export const metadata: Metadata = generateProjectMetadata(info)

export default function Page() {
  return <TextPageClient info={info} />
}
