import domElements from './utils/domElements';
import createStyledComponent from './core'
import css from './utils/css';
import {createContext} from 'react'
export const ThemeContext  = createContext({}) 
export const ThemeProvider = ThemeContext.Provider 
const styled  = (tag) => {
    return  (...args) => createStyledComponent(tag, css(...args));
}
domElements.forEach(domElement => {
    styled[domElement] = styled(domElement);
});
export default styled
