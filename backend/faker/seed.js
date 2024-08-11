import User from '../models/User.js'
import Comment from '../models/Comment.js';
import { faker } from '@faker-js/faker';
import Post from '../models/Post.js';

export default async function SeedFakeData(){
    
    /********* Populate Fake User Data **********/
    // try{
    //    for(let i = 0; i < 20; i++){
    //         const user = await User.create({
    //             username: faker.internet.userName(),
    //             password: faker.internet.password(),
    //             registered_at: faker.date.past(),
    //             profile_pic: faker.image.avatar(),
    //             bio: faker.lorem.sentence(50).substring(0, 30),
    //         })
    //    }

    // }catch(err){
    //     console.log(err)
    // }

    /************* Populate Fake Comment & Post Data ***********/
    // try{

    //     const data = await User.find();

    //     for (let i = 0; i < data.length; i++) {
    //         // Generate a random number of likes, comments, and reposts (it fetches its data meaning the assigned will be an array of objects)
    //         const randomLikes = data.slice(0, faker.number.int({ min: 0, max: data.length }));
    //         const randomComments = data.slice(0, faker.number.int({ min: 0, max: data.length }));
    //         const randomReposts = data.slice(0, faker.number.int({ min: 0, max: data.length }));

    //         // Create comments and get their IDs
    //         const comments = [];
    //         for (let j = 0; j < randomComments.length; j++) {
    //             const commentData = await Comment.create({
    //                 author: randomComments[j]._id,
    //                 content: faker.lorem.sentence(),
    //                 date_commented: new Date(),
    //             });
    //             comments.push(commentData._id);
    //         }

    //         // Create the post with random data
    //         const postData = await Post.create({
    //             author: data[i]._id,
    //             content: faker.lorem.sentence(50).substring(0, 100),
    //             content_image: i % 3 === 0 ? faker.image.url() : " ",
    //             likes: randomLikes.map(user => user._id),
    //             reposted_by: randomReposts.map(user => user._id),
    //             date_created: new Date(),
    //         });
    //     }

    // }catch(err){
    //     console.log(err)
    // }


    /****** update ***/
    // try{
    //     const users = await User.find();

    //     // Fetch all posts
    //     const posts = await Post.find();

    //     for (const post of posts) {
    //         // Generate a random number of users to add to reposted_by (between 2 and 3)
    //         const randomUsers = [];
    //         while (randomUsers.length < 2 + Math.floor(Math.random() * 2)) {
    //             const randomUser = users[Math.floor(Math.random() * users.length)];
    //             if (!randomUsers.includes(randomUser._id)) {
    //                 randomUsers.push(randomUser._id);
    //             }
    //         }

    //         // Update the post with the random users
    //         await Post.updateOne(
    //             { _id: post._id },
    //             { $set: { reposted_by: randomUsers } }
    //         );
    //     }

    // }catch(err){
    //     console.log(err)
    // }



    /**** User Following / Follower Populate *****/

    // try{
    //     const data = await User.find();

    //     for (let user of data) {
    //         // Exclude the current user from their own followers and following lists
    //         const otherUsers = data.filter(u => u._id.toString() !== user._id.toString());

    //         // Get random number of followers and following
    //         const followers = faker.number.int({ min: 0, max: otherUsers.length });
    //         const following =  faker.number.int({ min: 0, max: otherUsers.length });

    //         // Randomly select followers and following
    //         const randomFollowers = faker.helpers.shuffle(otherUsers).slice(0, followers).map(u => u._id);
    //         const randomFollowing = faker.helpers.shuffle(otherUsers).slice(0, following).map(u => u._id);

    //         // Update the user's followers and following lists
    //         await User.updateOne(
    //             { _id: user._id },
    //             {
    //                 $set: {
    //                     followers: randomFollowers,
    //                     following: randomFollowing,
    //                 },
    //             }
    //         );
    //     }

    // }catch(err){
    //     console.log(err)
    // }

}

