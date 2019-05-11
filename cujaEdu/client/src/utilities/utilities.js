export default {
    turnUserIntoArray: obj => {
        console.log('Utilities: ', obj)
        const arr = [];
        for(var prop in obj){
            arr.push({prop: obj[prop]})
        }
        return arr;
    },
    
}