import { useState } from 'react';
import AddressForm from './AddressUpdateForm';
import PasswordUpdateForm from './PasswordUpdateForm';

function UserProfile() {
  const [activeTab, setActiveTab] = useState('tab1');

  async function changePasswordHandler(passwordData) {
    const response = await fetch('/api/user/change-password', {
      method: 'PATCH',
      body: JSON.stringify(passwordData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    console.log(data);
  }

  return (
    <section className='w-auto min-h-[calc(100vh-130px)] mt-6 m-2'>
      <div>
        <h2 className=' mt-4 mb-6 text-2xl text-center font-bold'>
          My Profile
        </h2>
        <div className='flex justify-center mb-10'>
          <button
            className={activeTab === 'tab1' ? 'tab active-tab' : ' tab'}
            onClick={() => setActiveTab('tab1')}
          >
            Update Address
          </button>
          <button
            className={activeTab === 'tab2' ? 'tab active-tab' : ' tab'}
            onClick={() => setActiveTab('tab2')}
          >
            Change Password
          </button>
        </div>

        <hr className=' mb-10' />

        {activeTab === 'tab1' && <AddressForm />}
        {activeTab === 'tab2' && (
          <PasswordUpdateForm onChangePassword={changePasswordHandler} />
        )}
      </div>
    </section>
  );
}

export default UserProfile;
