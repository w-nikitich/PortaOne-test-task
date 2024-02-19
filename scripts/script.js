const reader = new FileReader();    
const input = document.getElementsByTagName('input')[0];
const maxNumberText = document.querySelector('.max.number');
const minNumberText = document.querySelector('.min.number');
const medianNumberText = document.querySelector('.median.number');
const meanNumberText = document.querySelector('.mean.number');
const maxchainNumberText = document.querySelector('.maxchain.number');
const minchainNumberText = document.querySelector('.minchain.number');

function readFile(input) {
    const file = input.files[0];
    reader.readAsText(file);

    reader.onload = () => {
        const content = reader.result;
        const arrayOfNumbers = content.split(/\s+/).map(Number);

        maxNum(arrayOfNumbers);
        minNum(arrayOfNumbers);
        median(arrayOfNumbers);
        arithmeticMean(arrayOfNumbers);
        maxChain(arrayOfNumbers);
        minChain(arrayOfNumbers);
        
    }
}

function maxNum(array) {
    let maxNumber = array[0];

    array.forEach(number => {
        if (number > maxNumber) maxNumber = number;
    });

    maxNumberText.innerHTML = maxNumber;
}

function minNum(array) {
    let minNumber = array[0];

    array.forEach(number => {
        if (number < minNumber) minNumber = number;
    });

    minNumberText.innerHTML = minNumber;
}

function median(array) {
    const isEven = (array.length % 2 === 0);
    let middleId;
    let medianNum;

    if (isEven) {
        middleId= array.length/2;
        medianNum = (array[middleId] + array[middleId-1]) / 2;
    } else {
        middleId = Math.floor(array.length/2);
        medianNum = array[middleId];
    }

    medianNumberText.innerHTML = medianNum;
}

function arithmeticMean(array) {
    let meanNumber = 0;

    array.forEach(number => {
        meanNumber += number;
    })

    meanNumber = meanNumber/array.length;

    meanNumberText.innerHTML = meanNumber;
}

function maxChain(array) {
    let maxChainNumbers = [];
    let maxChainLength = 0;
    let maxChainResults = [0];
    let maxChainObj = new Object();

    array.forEach((number, index) => {
        if (number < array[index+1]) {
            maxChainLength++;
            maxChainNumbers.push(number);

            if (array[index+1] > array[index+2]) {
                maxChainNumbers.push(array[index+1]);
            }
        }
        else if (maxChainLength === 0) {
            return;
        }
        else if ((array[index-1] < number) && (index === array.length-1)) {
            maxChainNumbers.push(number);
            maxChainObj[maxChainLength] = maxChainNumbers;
        }
        else {
            maxChainObj[maxChainLength] = maxChainNumbers;
            maxChainLength = 0;
            maxChainNumbers = [];
        }
    })

    Object.keys(maxChainObj).forEach((key) => {
        if (key > maxChainResults[0]) {
            maxChainResults[0] = key;
        }
    })

    maxChainResults.push(maxChainObj[maxChainResults[0]])
    maxchainNumberText.innerHTML = `${maxChainResults[0]} (${maxChainResults[1]})`
}

function minChain(array) {
    let minChainNumbers = [];
    let minChainLength = 0;
    let minChainResults = [0];
    let minChainObj = new Object();

    array.forEach((number, index) => {
        if (number > array[index+1]) {
            minChainLength++;
            minChainNumbers.push(number);

            if (array[index+1] < array[index+2]) {
                minChainNumbers.push(array[index+1]);
            }
        }
        else if (minChainLength === 0) {
            return;
        }
        else if ((array[index-1] > number) && (index === array.length-1)) {
            minChainNumbers.push(number);
            minChainObj[minChainLength] = minChainNumbers;
        }
        else {
            minChainObj[minChainLength] = minChainNumbers;
            minChainLength = 0;
            minChainNumbers = [];
        }
    })

    Object.keys(minChainObj).forEach((key) => {
        if (key > minChainResults[0]) {
            minChainResults[0] = key;
        }
    })

    minChainResults.push(minChainObj[minChainResults[0]])
    minchainNumberText.innerHTML = `${minChainResults[0]} (${minChainResults[1]})`
}

input.addEventListener('change', () => {
    readFile(input);
})