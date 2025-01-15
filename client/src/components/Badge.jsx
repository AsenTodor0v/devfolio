import React from 'react'

const Badge = ({ blog }) => {
    return (
        <span className="px-2 py-[5px] text-[13px] font-semibold bg-[#4fca70] text-[#FFFFFF] rounded-sm self-start">
            {blog?.category}
        </span>
    )
}

export default Badge