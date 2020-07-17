const fs = require('fs');
const { Restaurant, RestaurantKeyword } = require('./models');

const contents = fs.readFileSync("./db/seedData.json");
const jsonContent = JSON.parse(contents);

const createData = async (json) => {
    const result = [];
    for (el of json) {
        let priceVal = "$$"
        let transactionVal = el.transactions;
        if (el.price) {
            priceVal = el.price;
        }
        if (el.transactions.length === 0) {
            transactionVal = ["delivery"];
        }

        let keyword = await RestaurantKeyword.findOne({
            where: {
                keyword: el.categories[0].alias
            }
        })
        if (keyword === null) {
            keyword = await RestaurantKeyword.create({
                keyword: el.categories[0].alias,
                title: el.categories[0].title,
                createdAt: new Date(),
                updatedAt: new Date(),
            })
        }
        const newObj = {
            name: el.name,
            image_url: el.image_url,
            keywordId: keyword.id,
            price: priceVal,
            latitude: el.coordinates.latitude,
            longitude: el.coordinates.longitude,
            transactions: transactionVal.join(", "),
            address: el.location.display_address[0],
            phone: el.display_phone,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
        await Restaurant.create(newObj);

    }

    return result;

}

(async function () {

    const seedReadyData = await createData(jsonContent);
})()