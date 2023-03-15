const mongoose=require('mongoose');
mongoose.set('strictQuery', true);
const cities=require('./cities');
const Campground=require('../models/campground');
const {places,descriptors}=require('./seedHelpers');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
const db=mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Database connected");
});

const sample=(array)=>array[Math.floor(Math.random()*array.length)];

const seedDB=async ()=>{
    await Campground.deleteMany({});
    for(let i=0;i<300;i++){
        const random1000=Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*20)+10;
        const camp=new Campground({
            author: '63fe4404f8bbb199018bf605',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            // image: 'https://source.unsplash.com/collection/483251',
            description: 'Documentation and examples for Bootstraps powerful, responsive navigation header, the navbar. Includes support for branding, navigation, and more, including support for our collapse plugin.',
            price,
            geometry: { type: 'Point', coordinates: [ cities[random1000].longitude, cities[random1000].latitude] },
            images: [
                {
                  url: 'https://res.cloudinary.com/dtfecgjng/image/upload/v1677952514/YelpCamp/b1na179vkw0ph0erccs5.jpg',
                  filename: 'YelpCamp/b1na179vkw0ph0erccs5'
                },
                {
                  url: 'https://res.cloudinary.com/dtfecgjng/image/upload/v1677938144/YelpCamp/p2jvemdxmojfpamaiz1k.jpg',
                  filename: 'YelpCamp/kyaozmmrvkts2ujsjvhn'
                }
              ]
        })
        await camp.save();
    }
}
seedDB().then(()=>{
    mongoose.connection.close();
})

