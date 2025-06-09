const SelectButton = ({ name, id, isActive, onClick }) => {
  return (
    <div
      className={` px-4 py-2 cursor-pointer rounded-full text-[15px] block h-auto
        ${
          isActive
            ? 'bg-bm-blue hover:opacity-80 text-white font-bold'
            : 'bg-zinc-200 hover:bg-bm-blue hover:text-white text-zinc-400 font-semibold'
        }`}
      onClick={() => {
        onClick(id)
      }}
    >
      {name}
    </div>
  )
}
export default SelectButton
