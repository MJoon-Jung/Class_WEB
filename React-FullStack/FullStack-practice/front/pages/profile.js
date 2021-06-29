import React, { useEffect } from 'react';
import Router from 'next/router';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import NicknameEditForm from '../components/NicknameEditForm';
import AppLayout from '../components/AppLayout';
import FollowList from '../components/FollowList';

const Profile = () => {
  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    if (!me) {
      Router.replace('/');
    }
  }, [me]);

  return (
    <AppLayout>
      <Head>
        <title>내 프로필 </title>
      </Head>
      <NicknameEditForm />
      <FollowList
        header="팔로잉"
        data={me.Followings}
      />
      <FollowList
        header="팔로워"
        data={me.Followers}
      />
    </AppLayout>
  );
};

export default Profile;
