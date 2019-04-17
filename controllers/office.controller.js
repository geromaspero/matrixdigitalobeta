import HashMap from 'hashmap';

// Constructor
class OfficeController {
  constructor() {
    this.usersInRoomOffice = new HashMap();
  }

  addUserInRoom(user, room) {
    this.removeUser(user.id);
    
    var userInRoom = {
      user,
      room,
    };

    this.usersInRoomOffice.set(user.id, userInRoom);
  }

  setUserInMeet(userId, isUserInMeet) {
    var userInRoom = this.getUserInRoom(userId);
    
    if (userInRoom) {
      userInRoom.user.inMeet = isUserInMeet;

      this.addUserInRoom(userInRoom.user, userInRoom.room)
    }
  }

  getUserInRoom(userId) {
    return this.usersInRoomOffice.get(userId);;
  }
  
  removeUser(userId) {
    this.usersInRoomOffice.delete(userId);
  }

  getUsersInOffice() {
    return this.usersInRoomOffice;
  }

  getUsersInOfficeByMap() {
    var usersInOffice = new Map();

    this.getUsersInOffice().forEach((value, key) => {
        usersInOffice[key] = value;
    });

    return usersInOffice;
  }
}

export default OfficeController;
