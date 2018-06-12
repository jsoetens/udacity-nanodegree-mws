import {MDCRipple} from '@material/ripple';
import {MDCTextField} from '@material/textfield';
import {MDCSelect} from '@material/select';

const classRestaurantIdInput = 
  new MDCTextField(document.querySelector('.restaurant-id-input'));
const classNameInput = new MDCTextField(document.querySelector('.name-input'));
const classRestaurantRatingSelect = 
  new MDCSelect(document.querySelector('.restaurant-rating-select'));
const classCommentsInput = 
  new MDCTextField(document.querySelector('.comments-input'));

new MDCRipple(document.querySelector('.cancel'));
new MDCRipple(document.querySelector('.next'));