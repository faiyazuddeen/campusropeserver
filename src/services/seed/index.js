import User from '../../api/user/model'


const dummyUsers = [
    {
        name:'eliyas',
        email:'eliyas@rope.com',
        password:'password'
    },
    {
        name:'umar',
        email:'umar@rope.com',
        password:'password'
    },
    {
        name:'faiyaz',
        email:'faiyaz@rope.com',
        password:'password'
    },
    {
        name:'admin',
        email:'admin@rope.com',
        password:'password'
    }
]


export const createDummyUsers = () => {
    User.find({email:'eliyas@rope.com'})
    .countDocuments()
    .then((count) => {
        if(!count) {
            return User.create(dummyUsers);
        }
    })

}



export default {createDummyUsers}