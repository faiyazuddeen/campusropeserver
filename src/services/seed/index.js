import User from '../../api/user/model'
import Admintask from '../../api/admintask/model'

const BgGreen = "\x1b[42m";

const dummyUsers = [{
    name: 'eliyas',
    email: 'eliyas@rope.com',
    password: 'password'
  },
  {
    name: 'umar',
    email: 'umar@rope.com',
    password: 'password'
  },
  {
    name: 'faiyaz',
    email: 'faiyaz@rope.com',
    password: 'password'
  },
  {
    name: 'admin',
    email: 'admin@rope.com',
    password: 'password'
  }
]


export const createDummyUsers = () => {
  User.find({
      email: 'eliyas@rope.com'
    })
    .countDocuments()
    .then((count) => {
      if (!count) {
        User.create(dummyUsers)
          .then((users) => {
            console.log("created dummy users");
            const userIds = users.map((user) => ({
              userId: user._id
            }));
            Admintask.create(userIds).then((res) => console.log("created default admin tasks for dummy users"))
          });
      }else{
          console.log(BgGreen,"already created dummy users and default admin task for them");
      }
    })

}

export default {
  createDummyUsers
}