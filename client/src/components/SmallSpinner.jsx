import { ClipLoader } from "react-spinners";

const override = {
    display: 'block',
    borderColor: 'lightgreen',
};

const SmallSpinner = () => {
    return (
        <ClipLoader
            cssOverride={override}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    )
}

export default SmallSpinner