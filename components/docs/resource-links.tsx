import { GhButton, DocButton, ReleaseButton } from "./link-button"

interface Props {
  repo: string
  docs?: string
}

export default function ResourceLinks({ repo, docs }: Props) {
  return (
    <div className="flex flex-wrap gap-1">
      <GhButton link={repo} />
      <ReleaseButton link={`${repo}/releases`} />
      {docs && <DocButton link={docs} />}
    </div>
  )
}
