export const MapDropdownWrapper = ({ children, title }: { children; title: string }) => {
  return (
    <div
      className="
      flex flex-col z-10
      absolute -top-[36px] right-3 bg-white w-[290px] rounded overflow-hidden
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
