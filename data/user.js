const faker = require("faker");
const fs = require("fs");
const { userInfo } = require("os");

const generateFriends = () => {
    const friends = [];
    const jobs = [];
  
    for (let i = 1; i<=20; i++){
        const friendsName = faker.name.firstName();
        const friendslastName = faker.name.lastName();
        const friendAdress = {
            city: faker.address.city(),
            streetName: faker.address.streetName(),
            streeAdress: faker.address.streetAddress(),
        }
        friends.push({
            friendName : friendsName,
            friendLastName: friendslastName,
            friendAd : friendAdress,
        })
    }
    
    return { data: friends};
}

const data = generateFriends();
fs.writeFileSync('friends.json', JSON.stringify(data, null, "\t"))