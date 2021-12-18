import documentReady from "./helpers/documentReady";
import lazyImages from './modules/lazyImages';
import mainApp from "./components/mainApp";
documentReady(()=>{
	console.log('ready');
	lazyImages();
	mainApp();
})