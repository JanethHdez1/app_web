if('serviceWorker' in navigator){
    window.addEventListener('load',()=>{
        navigator.serviceWorker.register('./sw.js')
        .then(reg =>{
            console.log('Service worker')
        })
        .catch(err => {
            console.log("Error al registrar sw",err);
        });
    });
}