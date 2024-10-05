import { useContext } from 'react'
import {NumberWithChildrenContext} from "../../hooks/numberWithChildren/NumberWithChildren.jsx";

export const NumberField = () => {
    const { myNumber, setMyNumber } = useContext(NumberWithChildrenContext)

    const handleChange = (event) => {
        const value = event.target.value;

        if (value === "") {
            setMyNumber(0);
        } else {
            setMyNumber(Number(value));
        }
    }

    return (
        <div>
            <input type="number" value={myNumber} onChange={handleChange}></input>
        </div>
    )
}