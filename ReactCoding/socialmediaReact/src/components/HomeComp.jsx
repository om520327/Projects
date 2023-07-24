import React from 'react';
import '../Sass/HomeComp.scss';
import PostStatus from './common/PostUpdate';

const HomeComp = ({ currentUser }) => {
  return (
    <div className='home-component'>
      <PostStatus currentUser={currentUser} />
    </div>
  );
};

export default HomeComp;
