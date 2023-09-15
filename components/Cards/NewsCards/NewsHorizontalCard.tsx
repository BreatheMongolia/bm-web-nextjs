import { News } from 'graphql/generated'

export const NewsHorizontalCard = ({ news }: { news: News }) => {
  return (
    <div className="flex bg-white rounded overflow-hidden cursor-pointer">
      <div>Image</div>
      <div className="p-5">
        <span className="font-medium"> </span>
      </div>
    </div>
  )
}
