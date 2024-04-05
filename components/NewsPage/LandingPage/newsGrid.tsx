type Props = {
  children?: string | JSX.Element | JSX.Element[]
  isPaginated?: boolean
  defaultRows?: 1 | 2
}
export const NewsGrid = ({ children, defaultRows = 1, isPaginated = false }: Props) => {
  // NOTE: Assumption, numCols are default to 4 cols currently

  return (
    <div
      className={`grid gap-x-2 gap-y-3 justify-center ${
        defaultRows === 1 ? 'grid-cols-[330px]' : 'grid-cols-[330px_330px]'
      } sm:grid-cols-[330px_330px] lg:grid-cols-[330px_330px_330px] xl:grid-cols-[330px_330px_330px] 2xl:grid-cols-[330px_330px_330px_330px] `}
    >
      {children}

      {isPaginated && 'is paginated'}
    </div>
  )
}
