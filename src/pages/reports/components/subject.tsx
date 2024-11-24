interface IProps {
  title: string
  value: string
}

export const Subject = ({ title, value }: IProps) => {
  return (
    <div className="flex items-center gap-4">
      <span className="font-semibold">{title}</span>
      <span>{value}</span>
    </div>
  )
}