const fetchData = ()=>{
    const promise = new Promise((resolve, reject) => { //use promise with resolve and reject
        setTimeout(() => {
            resolve('Done!');
        }, 2000);
    });
    return promise;
};

console.log('Synchronous Data!');

setTimeout(()=>{ // async set timeout use callback
    console.log('Timer is done!');
    fetchData()
    .then(text => {
        console.log(text);
        return fetchData(); //call promises two times with multiple args
    })
    .then(text2 => {
        console.log(text2); //two times will print done message
    });
}, 1500);