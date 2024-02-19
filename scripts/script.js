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
    let maxChainArr = [];
    let maxChainLength = 0;

    array.forEach((number, index) => {
        if (number < array[index+1]) {
            maxChainLength++;
        }
        else {
            maxChainArr.push(maxChainLength);
            maxChainLength = 0;
        };

        // last
    })

    maxChainArr.forEach(number => {
        if (number > maxChainLength) {
            maxChainLength = number;
        }
    });

    maxchainNumberText.innerHTML = maxChainLength;
}

function minChain(array) {
    let minChainArr = [];
    let minChainLength = 0;

    array.forEach((number, index) => {
        if (number > array[index+1]) {
            minChainLength++;
        }
        else {
            minChainArr.push(minChainLength);
            minChainLength = 0;
        };
    })

    minChainArr.forEach(number => {
        if (number > minChainLength) {
            minChainLength = number;
        }
    });
    
    minchainNumberText.innerHTML = minChainLength;
}

input.addEventListener('change', () => {
    readFile(input);
})