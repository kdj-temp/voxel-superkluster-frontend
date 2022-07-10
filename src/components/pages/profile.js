import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import styled from "styled-components";

import { Input, Button, Upload, Form, Switch } from "antd";
import { UserOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { notification } from 'antd';

import Swal from 'sweetalert2' ;
import 'sweetalert2/src/sweetalert2.scss' ;

import * as selectors from '../../store/selectors';
import { Axios } from "../../core/axios";

const avatarImg = 'img/profile.png';
const bannerImg = 'img/banner.jpg';

const TabControls = styled.div`
  display: flex;
  gap: 12px;
`

const TabButton = styled(Button)`
  font-weight: 700;
  color: #8365E2;
  background: #EEEEEE;
  border: 1px solid #EEEEEE;
  border-radius: 4px;
  display: flex;
  align-items: center;

  &.active {
    color: white;
    background: #F70DFF;
    border: 1px solid #F70DFF;
  }
`

const TabContent = styled.div`
  margin: 42px 0px;
`

const ActionButton = styled(Button)`
  width: 200px;
  height: 42px;
  color: white;
  background: #F70DFF;
  border: 1px solid #F70DFF;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;

  &:hover {
    background: #EEEEEE;
    border: 1px solid #EEEEEE;
  }
`

const AvatarUpload = styled(Upload)`
  & .ant-upload.ant-upload-select-picture-card {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
`

const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`

const BannerUpload = styled(Upload)`
  & .ant-upload.ant-upload-select-picture-card {
    width: 300px;
    height: 200px;
    border-radius: 40px;
  }
`

const BannerImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 40px;
`

const labelFontStyle = {
  fontSize: 18,
  fontWeight: 500,
  paddingBottom: 5
}

const ProfileForm = styled(Form)`

  & .ant-form-item-label {
    font-size: 16px;
    font-weight: 500;
    padding-bottom: 12px;
  }

  & .ant-form-item {
    margin-bottom: 32px;
  }

`

const NotificationsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
`

const NotificationItem = styled.div`
  padding: 20px;
  padding-bottom: 10px;
  border: solid 1px rgba(0, 0, 0, .1);
`

const NofitcationLine = styled.div`
  display: flex;
  justify-content: space-between;
`

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

const Profile = () => {

  const accessTokenState = useSelector(selectors.accessToken);
  const accessToken = accessTokenState.data ? accessTokenState.data : null;
  const [tab, setTab] = useState('profile');

  const [profileForm] = Form.useForm();
  const [notificationForm] = Form.useForm();

  const [avatar, setAvatar] = useState();
  const [avatarFile, setAvatarFile] = useState();

  const [banner, setBanner] = useState();
  const [bannerFile, setBannerFile] = useState();


  useEffect(() => {
    async function getProfile() {

      if (!accessToken) {
        return;
      }

      const header = { 'Authorization': `Bearer ${accessToken}` }
      const { data } = await Axios.get(
        `/api/users/profile`,
        {
          headers: header
        }
      );

      if (data) {
        profileForm.setFieldsValue({
          username: data['username'] ?? "",
          bio: data['bio'] ?? "",
          email: data['email'] ?? "",
          banner: data['banner'] ?? "",
          avatar: data['avatar'] ?? "",
          link_twitter: data['link_twitter'] ?? "",
          link_instagram: data['link_instagram'] ?? "",
          link_external: data['link_external'] ?? ""
        });
        if (data['notification']) {
          notificationForm.setFieldsValue(data['notification']);
        }

        setAvatar(data['avatar']);
        setBanner(data['banner']);
      }
    }

    getProfile();

  }, [
    accessToken
  ])

  const handleTab = (_tab) => {
    setTab(_tab);
  }

  const handleUpdateProfile = (info) => {
    // updateUser(values);
    const formData = new FormData();
    formData.append('username', info.username);
    formData.append('bio', info.bio);
    formData.append('email', info.email);
    formData.append('link_external', info.link_external);
    formData.append('link_twitter', info.link_twitter);
    formData.append('link_instagram', info.link_instagram);

    if (avatarFile) {
      formData.append('avatar', avatarFile);
    }

    if (bannerFile) {
      formData.append('banner', bannerFile);
    }

    Axios.post(`/api/users/profile`, formData,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data'
        }
      }).then(resp => {
        // notification.success({
        //   message: "Update profile successed."
        // });
        Swal.fire({
          title: 'It worked!',
          text: 'Update profile successed.',
          icon: 'success',
          confirmButtonText: 'Close',
          timer: 5000,
          customClass: 'swal-height'
        })
      }).catch(err => {
        // notification.error({
        //   message: "Update profile failed."
        // });
        Swal.fire({
          title: 'Oops...',
          text: 'Update profile failed.',
          icon: 'error',
          confirmButtonText: 'Close',
          timer: 5000,
          customClass: 'swal-height'
        })
      });
  }

  const handleChangeAvatar = (info) => {
    if (info.file) {
      setAvatarFile(info.file);
      // console.log(info);

      getBase64(info.file, imageUrl => {
        setAvatar(imageUrl);
      });
    }
  }

  const handleChangeBanner = (info) => {
    if (info.file) {
      setBannerFile(info.file);
      // console.log(info);

      getBase64(info.file, imageUrl => {
        setBanner(imageUrl);
      });
    }
  }

  const handleUpdateNotification = (info) => {

    Axios.post(`/api/users/notification`, info,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }).then(resp => {
        // notification.success({
        //   message: "Update notification successed."
        // });
        Swal.fire({
          title: 'It worked!',
          text: 'Update notification successed.',
          icon: 'success',
          confirmButtonText: 'Close',
          timer: 5000,
          customClass: 'swal-height'
        })
      }).catch(err => {
        // notification.error({
        //   message: "Update notification failed."
        // });
        Swal.fire({
          title: 'Oops...',
          text: 'Update notification failed.',
          icon: 'error',
          confirmButtonText: 'Close',
          timer: 5000,
          customClass: 'swal-height'
        })
      });
  }

  return (
    <div style={{ fontFamily: "Roboto" }}>

      <section className='jumbotron breadcumb no-bg' style={{ backgroundImage: `url(${'/img/background/profile.jpg'})` }}>
        <div className='mainbreadcumb'>
          <div className='custom-container'>
            <div className='row m-10-hor'>
              <div className='col-12'>
                <h1 className='text-center'>My Profile</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='custom-container'>

        <div className="row">

          <div className="col-lg-8 offset-lg-2">

            <TabControls>

              <TabButton className={tab === 'profile' ? 'active' : ''}
                onClick={() => handleTab('profile')}
                icon={<UserOutlined />}>
                Profile
              </TabButton>
              <TabButton className={tab === 'notification' ? 'active' : ''}
                onClick={() => handleTab('notification')}
                icon={<ExclamationCircleFilled />}>
                Notifications
              </TabButton>
              {
                /*
                  <TabButton className={tab === 'appearance' ? 'active' : ''}
                    onClick={() => handleTab('appearance')}
                    icon={<ToolOutlined />}>
                    Appearance
                  </TabButton>
                */
              }

            </TabControls>

            <TabContent>

              <div className={tab !== 'profile' ? 'hide' : ''}>

                <div className="row">

                  <div className="col-lg-8 col-md-12 col-sm-12">

                    <ProfileForm
                      layout="vertical"
                      onFinish={handleUpdateProfile}
                      form={profileForm}>

                      <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                          {
                            required: true,
                            message: "Please input your username!"
                          }
                        ]}>
                        <Input placeholder="Enter username" />
                      </Form.Item>

                      <Form.Item
                        label="Bio"
                        name="bio">
                        <Input.TextArea placeholder="Tell the world who you are!" rows={3} />
                      </Form.Item>

                      <Form.Item
                        label="Email Address"
                        name="email"
                        rules={[
                          {
                            required: true,
                            type: 'email',
                            message: "Please input your email!"
                          }
                        ]}>
                        <Input placeholder="Enter email" />
                      </Form.Item>

                      <Form.Item
                        label="Your site link"
                        name="link_external">
                        <Input placeholder="Enter Website URL" />
                      </Form.Item>

                      <Form.Item
                        label="Twitter username"
                        name="link_twitter">
                        <Input placeholder="Enter Twitter username" />
                      </Form.Item>

                      <Form.Item
                        label="Instagram username"
                        name="link_instagram">
                        <Input placeholder="Enter Instagram username" />
                      </Form.Item>

                      <Form.Item>
                        <ActionButton htmlType="submit">Update</ActionButton>
                      </Form.Item>

                    </ProfileForm>

                  </div>

                  <div className="col-lg-4 col-md-12 col-sm-12">

                    <div className="mb-4">
                      <label style={labelFontStyle} className="input-label">Profile image</label>
                      <AvatarUpload
                        listType="picture-card"
                        maxCount={1}
                        showUploadList={false}
                        onChange={handleChangeAvatar}
                        beforeUpload={() => false}
                      >
                        <AvatarImg src={avatar ? avatar : avatarImg} />
                      </AvatarUpload>
                    </div>

                    <div className="mb-4">
                      <label style={labelFontStyle} className="input-label">Profile banner</label>
                      <BannerUpload
                        listType="picture-card"
                        maxCount={1}
                        showUploadList={false}
                        onChange={handleChangeBanner}
                        beforeUpload={() => false}
                      >
                        <BannerImg src={banner ? banner : bannerImg} />
                      </BannerUpload>
                    </div>

                  </div>

                </div>

              </div>

              <div className={tab !== 'notification' ? 'hide' : ''}>

                <Form
                  onFinish={handleUpdateNotification}
                  form={notificationForm}>

                  <NotificationsList>

                    <NotificationItem>
                      <NofitcationLine>
                        <label style={labelFontStyle}>Item Sold</label>
                        <Form.Item
                          name="item_sold"
                          valuePropName="checked">
                          <Switch size="small" />
                        </Form.Item>
                      </NofitcationLine>
                      When someone purchased your item.
                    </NotificationItem>

                    <NotificationItem>
                      <NofitcationLine>
                        <label style={labelFontStyle}>Auction Expiration</label>
                        <Form.Item
                          name="auction_expiration"
                          valuePropName="checked">
                          <Switch size="small" />
                        </Form.Item>
                      </NofitcationLine>
                      When an auction you created ends.
                    </NotificationItem>

                    <NotificationItem>
                      <NofitcationLine>
                        <label style={labelFontStyle}>Bid Activity</label>
                        <Form.Item
                          name="bid_activity"
                          valuePropName="checked">
                          <Switch size="small" />
                        </Form.Item>
                      </NofitcationLine>
                      When someone purhased your item.
                    </NotificationItem>

                    <NotificationItem>
                      <NofitcationLine>
                        <label style={labelFontStyle}>Outbid</label>
                        <Form.Item
                          name="outbid"
                          valuePropName="checked">
                          <Switch size="small" />
                        </Form.Item>
                      </NofitcationLine>
                      When an offer you placed is exceeded by another user.
                    </NotificationItem>

                    <NotificationItem>
                      <NofitcationLine>
                        <label style={labelFontStyle}>Price Change</label>
                        <Form.Item
                          name="price_changed"
                          valuePropName="checked">
                          <Switch size="small" />
                        </Form.Item>
                      </NofitcationLine>
                      When an item you made an offer on changes in price.
                    </NotificationItem>

                    <NotificationItem>
                      <NofitcationLine>
                        <label style={labelFontStyle}>Successful Purchase</label>
                        <Form.Item
                          name="purchase"
                          valuePropName="checked">
                          <Switch size="small" />
                        </Form.Item>
                      </NofitcationLine>
                      When you successfully buy an item.
                    </NotificationItem>

                  </NotificationsList>

                  <div className="mt-4">
                    <ActionButton htmlType="submit">Update</ActionButton>
                  </div>

                </Form>

              </div>

            </TabContent>

          </div>

        </div >

      </section >
    </div >
  );
}
export default Profile;