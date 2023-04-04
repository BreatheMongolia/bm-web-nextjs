const SimpleButton = ({ text, color = 'bg-sky-500' }: { text: string; color?: 'bg-sky-500' | 'bg-action-red' }) => {
  const getBorderColor = () => {
    return color === 'bg-sky-500' ? 'border-sky-600' : 'border-red-700'
  }
  return (
    <div
      className={`rounded-xl relative inline-flex group items-center justify-center px-8 py-2 m-1 cursor-pointer 
    border-2 ${color} active:${getBorderColor()}
    active:shadow-none shadow-lg 
    text-white uppercase text-md tracking-wide `}
    >
      <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-16 group-hover:h-16 opacity-10"></span>
      <span className="relative">{text}</span>
    </div>
  )
}

export default SimpleButton
