const Modal = ({ children, toggleModal }) => {
    function handeToggleModal(e) {
        if (e.target.id === "modal") {
            toggleModal()
        }
    }

    return (
        <div id="modal" onClick={handeToggleModal} className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50 h-s">
            {children}
        </div>
    )
}

export default Modal