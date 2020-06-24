import domElements from '../utils/domElements';
import createStyledComponent from './createComponent'
import css from './css';
import {createContext} from 'react'
export const ThemeContext  = createContext(null) 
export const ThemeProvider = ThemeContext.Provider 
const styled  = (tag) => {
    return  (...args) => createStyledComponent(tag, css(...args));
}
domElements.forEach(domElement => {
    styled[domElement] = styled(domElement);
});
export default styled
