type Props = {
  children?: string | JSX.Element | JSX.Element[]
  isPaginated?: boolean
  defaultRows?: 1 | 2
}
export const NewsGrid = ({ children, defaultRows = 1, isPaginated = false }: Props) => {
  // NOTE: Assumption, numCols are default to 4 cols currently

  return (
    <div
      className={`grid ${
        defaultRows === 1 ? 'grid-cols-1' : 'grid-cols-2'
      } sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 justify-between gap-4`}
    >
      {children}

      {isPaginated && 'is paginated'}
    </div>
  )
}
