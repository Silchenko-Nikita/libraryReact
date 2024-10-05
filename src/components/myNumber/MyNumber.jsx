import { useContext } from 'react'
import {NumberWithChildrenContext} from "../../hooks/numberWithChildren/NumberWithChildren.jsx";

export const MyNumber = () => {
    const { myNumber } = useContext(NumberWithChildrenContext)
    return (
        <h3>My number: {myNumber}</h3>
    )
}