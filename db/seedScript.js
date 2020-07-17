const fs = require('fs');

const contents = fs.readFileSync("./seedData.json");
const jsonContent = JSON.parse(contents);

const createData = (json) => {
    const result = [];
    json.forEach((el) => {
        let priceVal = "$$"
        let transactionVal = el.transactions;
        let latVal = el.coordinates.latitude;
        let longVal = el.coordinates.longitude;
        if (el.price) {
            priceVal = el.price;
        }
        if (transactionVal === []) {
            transactionVal = "null"
        }
        numString = latVal.toString();
        while (numString.length < 16) {
            numString = `${numString}0`;
            console.log(latVal)
        }


        const newObj = {
            name: el.name,
            image_url: el.image_url,
            keywordId: 1,
            price: priceVal,
            latitude: el.coordinates.latitude,
            longitude: el.coordinates.longitude,
            transactions: transactionVal,
            address: el.location.display_address[0],
            phone: el.display_phone,
        }
        result.push(newObj);

    })

    return result;

}

const seedReadyData = createData(jsonContent);

fs.writeFile("seedReadyData.js", JSON.stringify(seedReadyData), (err) => {
    if (err) throw err;
    console.log("File Written...");
});