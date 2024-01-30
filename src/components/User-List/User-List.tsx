import React, { FC, useEffect, useState, useRef } from 'react';
import './User-List.scss';
import axios from 'axios';
import MyModal from '../My-modal/My-modal'; // Import the Modal component
import UserDetails from '../User-Details/User-Details';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface UserListProps {
  id: number;
  name: string;
  email: string;
}

const UserList: FC<UserListProps> = () => {
  // מאחסן את רשימת המשתמשים שהובאו מה-API.
  const [userList, setUserList] = useState<any[]>([]);
  // מאחסן את רשימת המשתמשים שיוצגו לאחר הסינון.
  const [displayedUserList, setDisplayedUserList] = useState<any[]>([]);
  // טעינת המשתמשים
  const [loading, setLoading] = useState(true);
  // מאחסן את המזהה של המשתמש שנבחר למחיקה.
  const [showModal, setShowModal] = useState(false);
  // המחיקה של המשתמש מתבצעת על פי ה-ID 
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);



  // פונקציה להוספת משתמש
  const AddUser = (user: any) => {
    userList.push(user)
    // עידכון מחדש של הרשימת משתמשים
    setUserList([...userList])
    // עידכון בתצוגה את המשתמש החדש שהוכנס
    setDisplayedUserList([...userList])
  };


  // הוא משמש כדי להביא את רשימת המשתמשים מה-API כאשר הרכיב נטען
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // שאיבת הנתונים של המשתמשים מהשרת,והצגתם על גבי המסך
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUserList(response.data);
        setDisplayedUserList(response.data);
        setLoading(false);
        // אם הוא לא הצליח להביא את רשימת המשתמשים מהשרת הוא תופס את השגיאה
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };


    // מביאה  את רשימת המשתמשים מה-API באמצעות Axios
    fetchUsers();
  }, []);
  

  //  פונקציה המופעלת כאשר המשתמש מקליד את קלט החיפוש. הוא מסנן את רשימת המשתמשים על סמך ערך הקלט
  const handleSearch = () => {
    // סינון על פי החיפוש של המשתמש, מתבצע על פי השם
    const searchTerm = inputRef.current?.value.toLowerCase() || '';
    const filteredUsers = userList.filter(user =>
      user.name.toLowerCase().includes(searchTerm)
    );
 
    //  פונקציה המופעלת כאשר המשתמש לוחץ על כפתור "מחק"
    setDisplayedUserList(filteredUsers);
  };

  // מחיקה מתבצעת על פי User-id
  const handleDelete = (userId: number) => {
    setSelectedUserId(userId);
    setShowModal(true);
  };

  // פונקציה אסינכרונית הנקראת כאשר המשתמש מאשר את המחיקה במודאל
  const handleConfirmDelete = async () => {
    if (selectedUserId !== null) {
      try {
        await axios.delete(`https://jsonplaceholder.typicode.com/users/${selectedUserId}`);
        setUserList(prevList => prevList.filter(user => user.id !== selectedUserId));
        setDisplayedUserList(prevList => prevList.filter(user => user.id !== selectedUserId));
        setShowModal(false);
      } catch (error) {
        console.error('Error deleting user:', error);

      }
    }
  };
  // פונקציה המופעלת כאשר המשתמש סוגר את מוד אישור מחיקה  
  const handleCloseModal = () => {
    setShowModal(false);
  };

  //  פונקציה המופעלת כאשר המשתמש מבטל את המחיקה במודאל. 
  const onConfirms = () => {
    alert("the user not delete from the servies");
    setShowModal(false)
  }

  return (

    <div className="User-List">
      <div className="container-fluid">
        <div className="row">
        <div className='col-md-6 '>
            {<UserDetails onchange={AddUser}></UserDetails>}
          </div>
          <div className="col-md-6 ">
            <br></br>
            <input
              type="text"
              placeholder="Search by name..."
              ref={inputRef}
              onBlur={handleSearch}
            />
            <br></br>
            <br></br>
            
            {loading ? (
              <div className="loader"></div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedUserList.map(user => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>
                        <button onClick={() => handleDelete(user.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {showModal ? <MyModal
              title="Are you sure you want to delete this user?"
              // show={showModal}
              onClose={handleCloseModal}
              onConfirm={onConfirms}
            >
              {selectedUserId && <p>Deleting user with ID: {selectedUserId}</p>}

            </MyModal> : null}

          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;

