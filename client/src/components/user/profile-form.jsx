import React, { useEffect } from 'react';
import UserStore from '../../store/UserStore';
import toast from 'react-hot-toast';
import ProfileSkeleton from '../../skeleton/profile-skeleton';

const ProfileForm = () => {
  let {
    ProfileDetails,
    ProfileForm,
    ProfileFormChange,
    ProfileDetailsRequest,
    ProfileSaveRequest,
  } = UserStore();

  useEffect(() => {
    (async () => {
      await ProfileDetailsRequest();
    })();
  }, []);

  const Save = async () => {
    let res = await ProfileSaveRequest(ProfileForm);
    if (res) {
      toast.success('Profile Updated');
      await ProfileDetailsRequest();
    }
  };

  if (ProfileDetails === null) {
    return <ProfileSkeleton />;
  } else {
    return (
      <div className="container mt-5">
        <div className="card p-4 p-md-5 rounded-3 shadow-sm">
          <h6>Customer Details</h6>
          <hr />
          <div className="row g-3">
            {[
              { label: 'Customer Name', key: 'cus_name' },
              { label: 'Customer Phone', key: 'cus_phone' },
              { label: 'Customer Fax', key: 'cus_fax' },
              { label: 'Customer Country', key: 'cus_country' },
              { label: 'Customer City', key: 'cus_city' },
              { label: 'Customer State', key: 'cus_state' },
              { label: 'Customer Post Code', key: 'cus_postcode' },
              { label: 'Customer Address', key: 'cus_add' },
            ].map(({ label, key }) => (
              <div key={key} className="col-12 col-md-6 col-lg-3">
                <label className="form-label">{label}</label>
                <input
                  value={ProfileForm[key]}
                  onChange={(e) => ProfileFormChange(key, e.target.value)}
                  type="text"
                  className="form-control"
                />
              </div>
            ))}
          </div>

          <h6 className="mt-5">Shipping Details</h6>
          <hr />
          <div className="row g-3">
            {[
              { label: 'Shipping Name', key: 'ship_name' },
              { label: 'Shipping Phone', key: 'ship_phone' },
              { label: 'Shipping Country', key: 'ship_country' },
              { label: 'Shipping City', key: 'ship_city' },
              { label: 'Shipping State', key: 'ship_state' },
              { label: 'Shipping Post Code', key: 'ship_postcode' },
              { label: 'Shipping Address', key: 'ship_add' },
            ].map(({ label, key }) => (
              <div key={key} className="col-12 col-md-6 col-lg-3">
                <label className="form-label">{label}</label>
                <input
                  value={ProfileForm[key]}
                  onChange={(e) => ProfileFormChange(key, e.target.value)}
                  type="text"
                  className="form-control"
                />
              </div>
            ))}
          </div>

          <div className="row mt-4">
            <div className="col-12 col-md-3">
              <button onClick={Save} className="btn btn-success w-100">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ProfileForm;
