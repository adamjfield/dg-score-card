import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { QUERY_ME } from '../utils/queries';
import { useQuery, useMutation } from '@apollo/client';
import HistoryModal from '../components/HistoryModal';
import FavCourses from '../components/FavCourses';

function Profile() {
  const [show, setShow] = useState(false);
  const { loading, data } = useQuery(QUERY_ME, {});
  const user = data?.me || {};

  // console.log(user);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user?.username) {
    return (
      <div className='d-flex flex-column align-items-center'>
        <h4 className='loginMsg fw-bold'>
          You need to be logged in to see this page. Use the navigation links
          above to sign up or log in!
        </h4>
        <Link to={'/login'} className='my-2'>
          <button className='btn btn-primary'>Login</button>
        </Link>
      </div>
    );
  }

  const toggleModal = () => {
    setShow(!show);
  };

  return (
    <section className='d-flex justify-content-center'>
      <HistoryModal show={show} handleClose={toggleModal} user={user} />
      <div className=' flex-column'>
        <h1 className='text-center'>Welcome {user.username}!</h1>
        <Link to={'/viewcourses'}>
          <button className='button-next my-4' as={NavLink} to={'/'}>
            Find a New Course
          </button>
        </Link>
        <div>
          <h2 className='text-center'>or</h2>
          <h2 className='text-center'>stick with a favorite</h2>
          {user.courses.length === 0 ? (
            <div>No courses added to favorites</div>
          ) : (
            <FavCourses courses={user.courses} />
          )}
        </div>
        <div>
          <h3
            className='history-btn text-center my-5'
            onClick={() => toggleModal()}
          >
            View my History
          </h3>
        </div>
      </div>
    </section>
  );
}

export default Profile;
