
type TabsContentProps = {
  title: string
  children: JSX.Element | JSX.Element[];
}

const TabsContent: React.FC<TabsContentProps> = ({ title, children }) => {
  return <div title={title}>{children}</div>
}

export default TabsContent