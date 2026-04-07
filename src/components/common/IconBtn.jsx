import React from 'react'

const IconBtn = ({ text, onClick, children, disabled, outline = false, customClasses, type }) => {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={`flex items-center justify-center outline-none ${outline ? "border border-yellow-50 bg-transparent" : "bg-[#D4AF37]"} cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-[#5D171F] hover:bg-black hover:text-yellow-50 duration-300 ${customClasses}`}
            type={type}
        >
            {
                children ? (
                    <>
                        <span className={`${outline && "text-yellow-50"}`}>{text}</span>
                        {children}
                    </>
                ):(text)
            }
        </button>
    )
}

export default IconBtn
