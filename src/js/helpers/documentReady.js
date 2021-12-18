export default (fn) => {
	document.readyState === 'loading' ? window.addEventListener('DOMContentLoaded', fn) : fn();
};