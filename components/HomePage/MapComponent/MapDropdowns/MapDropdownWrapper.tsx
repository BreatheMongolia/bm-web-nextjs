export const MapDropdownWrapper = ({ children, title }: { children; title: string }) => {
  return (
    <div
      className="
      flex flex-col z-10
      absolute bg-white rounded overflow-hidden
      left-2 md:left-auto md:right-3
      -top-16 md:-top-[36px] 
      w-11/12 md:w-[290px]
      border-[0.5px] border-[#4870d7] backdrop-blur-xl
      text-white
      "
    >
      <div className="pl-4 text-base mb-[1px] font-semibold bg-[#4870d7]" style={{ lineHeight: '36px' }}>
        <h2> {title} </h2>
      </div>
      {children}
    </div>
  )
}
