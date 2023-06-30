import React, {useState} from 'react'
import { SecondBurgerNavContext } from './secondBurgerNavContext'


const SecondBurgerNavWrapper = ({children}) => {
    const [isSecondOpen, setIsSecondOpen] = useState(true)
    const SecondBurgerNavClick = () => {
        setIsSecondOpen(!isSecondOpen)
    }

    return (
        <SecondBurgerNavContext.Provider value={{SecondBurgerNavClick, isOpen}}>
            {children}
        </SecondBurgerNavContext.Provider>
    )
}

export default SecondBurgerNavWrapper;
