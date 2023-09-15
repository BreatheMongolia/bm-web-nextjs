type Props = {
  children?: string | JSX.Element | JSX.Element[]
  isPaginated?: boolean
  numRows?: number
}
export const NewsGrid = ({ children, numRows, isPaginated = false }: Props) => {
  // NOTE: Assumption, numCols are default to 4 cols currently

  return (
    <div className={`grid grid-cols-4 justify-between gap-4`}>
      {children}

      {isPaginated && 'is paginated'}
    </div>
  )
}
