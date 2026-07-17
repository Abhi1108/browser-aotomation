export default function ChooseOrganizationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-svh items-center justify-center">{children}</div>
  )
}
