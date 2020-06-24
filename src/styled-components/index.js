import domElements from '../utils/domElements';
import constructWithOptions from './constructWithOptions'
import createStyledComponent from './createComponent'
const styled  = (tag) => {
    return constructWithOptions(createStyledComponent, tag);

}
domElements.forEach(domElement => {
    styled[domElement] = styled(domElement);
});
export default styled