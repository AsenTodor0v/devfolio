import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

const PagePagination = ({ totalPages, handlePageChange, page, increasePage, decreasePage }) => {
    const number = Array.from({ length: totalPages }, (_, index) => index + 1)
    const firstPage = 1
    const lastPage = number[number.length - 1]

    return (
        <Pagination className="my-5 dark:text-[#FFFFFF]">
            <PaginationContent>

                {page === firstPage ||
                    <PaginationItem onClick={decreasePage}>
                        <PaginationPrevious href="#" />
                    </PaginationItem>}

                {number.map((item) => (
                    <PaginationItem key={item} onClick={() => handlePageChange(item)}>
                        {item === page ? (<PaginationLink href="#" isActive>{item}</PaginationLink>) :
                            (<PaginationLink href="#" >{item}</PaginationLink>)}

                    </PaginationItem>
                ))}

                {page === lastPage ||
                    <PaginationItem onClick={increasePage}>
                        <PaginationNext href="#" />
                    </PaginationItem>}

            </PaginationContent>
        </Pagination>
    )
}

export default PagePagination
