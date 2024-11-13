export default function DashboardTemplate({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="animate-appear">{children}</div>
}
