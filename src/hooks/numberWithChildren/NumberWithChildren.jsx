import { createContext, useState } from 'react'

export const NumberWithChildrenContext = createContext()

function NumberWithChildren({children}) {
    const [myNumber, setMyNumber] = useState(14)

    const value = { myNumber, setMyNumber }

    return <NumberWithChildrenContext.Provider value={value}>
        {children}
    </NumberWithChildrenContext.Provider>

}

export default NumberWithChildren
