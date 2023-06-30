import React, {useState} from 'react'
import { BurgerNavContext } from './burgerNavContext'


const BurgerNavWrapper = ({children}) => {
    const [isOpen, setIsOpen] = useState(false)
    const BurgerNavClick = () => {
        setIsOpen(!isOpen)
    }

    return (
        <BurgerNavContext.Provider value={{BurgerNavClick, isOpen}}>
            {children}
        </BurgerNavContext.Provider>
    )
}

export default BurgerNavWrapper;
