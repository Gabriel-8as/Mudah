const GlobalService = {

    numberToMoney(num) {
        let number = parseFloat(num).toFixed(2).split('.');
        number[0] = number[0].split(/(?=(?:...)*$)/).join('.');
        return number.join(',');
    },

    capitalizeFirstLetter(string) {
        return string[0].toUpperCase() + string.slice(1);
    },

};

export default GlobalService;