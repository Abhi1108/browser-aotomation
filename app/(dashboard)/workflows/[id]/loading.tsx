import { Spinner } from "@/components/ui/spinner"

export default function WorkflowLoading() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <Spinner className="size-6" />
    </div>
  )
}
