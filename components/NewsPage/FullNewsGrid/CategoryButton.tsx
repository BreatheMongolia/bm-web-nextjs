const CategoryButton = ({ name, category, onClick, isActive }) => {
  return (
    <div
      className={` px-4 py-2 cursor-pointer rounded-full text-[15px]
        ${
          isActive
            ? 'bg-[#f09c4f] hover:opacity-80 text-white font-bold'
            : 'bg-zinc-200 hover:bg-[#f09c4f] hover:text-white text-zinc-400 font-semibold'
        }`}
      onClick={() => {
        onClick(category)
      }}
    >
      {name}
    </div>
  )
}
export default CategoryButton
