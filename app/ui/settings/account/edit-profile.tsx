'use client';
import { useState, MouseEvent, Dispatch, SetStateAction } from "react";
import { Button } from "../../button";
import { updateProfile } from "@/app/lib/action";
import { Profile } from "@/app/lib/definitions";
import LocationInput from "./location-input";
import { XMarkIcon } from "@heroicons/react/24/outline";


function ConfirmPopUp({
  user,
  profile,
  setModal
}: {
  user:any;
  profile: Profile;
  setModal: Dispatch<SetStateAction<boolean>>;
}) {
  const [confirmed, setConfirmed] = useState(false);

  const confirmDeletion = () => {
    
    if (user.email !== profile.email) {
      setConfirmed(true);
    } else {
      setModal(false);
    }
    updateProfile(profile);
  }

  return (
    <div className="modal absolute flex items-center justify-center w-full h-full bg-gray-400 rounded-xl">
      <div className="dark-tertiary flex flex-col overflow-auto size-11/12 max-w-[450px] max-h-[350px] p-4 shadow-lg absolute rounded-xl bg-gray-50">
        <div className="w-full flex justify-end">
          <button onClick={() => setModal(false)}>
            <XMarkIcon className="w-5 h-5 text-red-500" />
          </button>
        </div>
        {confirmed
        ? <div className="grow w-full flex flex-col items-center mb-4">
            <p className="text-center mb-4">An confirmation email has been sent to the emails &nbsp;
              <span className="text-yellow-500">{user.email}</span> and &nbsp;
              <span className="text-yellow-500">{profile.email}</span>
            </p>
            <button 
              className="w-4/5 mx-auto px-3 py-2 bg-yellow-400 rounded-xl hover:bg-yellow-300 active:bg-yellow-500 sm:w-3/5"
              onClick={() => {setConfirmed(false); setModal(false);}}
            >  
              Ok
            </button>
          </div>
        : <div className="grow w-full flex flex-col items-center mb-4">
            <h1 className="text-center mb-2 text-lg font-bold sm:text-xl">Update Confirmation</h1>
            <p className="text-center mb-4 text-sm sm:text-base">Confirm that the values below are accurate.</p>
            <div className="w-full mb-4 flex flex-col items-center">
              <div className="w-full mb-4 md:w-4/5 flex flex-col md:flex-row">
                <div className="w-full md:w-2/5">
                  <h3 className="profile-form-label text-xs sm:text-sm">Name</h3>
                  <p className="w-fit h-4 text-sm sm:text-base">{profile.name}</p>
                </div>

                <hr className="profile-form-divider md:w-5/6 md:hidden md:my-4" />

                <div className="w-full md:w-3/5">
                  <h3 className="profile-form-label text-xs sm:text-sm">Email</h3>
                  <p className="w-fit h-4 text-sm sm:text-base">{profile.email}</p>
                </div>
              </div>

              <hr className="profile-form-divider md:w-5/6 md:hidden md:my-4" />

              <div className="w-full md:w-4/5 flex flex-col md:flex-row">
                <div className="w-full md:w-2/5">
                  <h3 className="profile-form-label text-xs sm:text-sm">Location</h3>
                  <p className="w-fit h-4 text-sm sm:text-base">{profile.location}</p>
                </div>

                <hr className="profile-form-divider md:w-5/6 md:hidden md:my-4" />

                <div className="w-full md:w-3/5">
                  <h3 className="profile-form-label text-xs sm:text-sm">Phone</h3>
                  <p className="w-fit h-4 text-sm sm:text-base">{profile.phone}</p>
                </div>
              </div>
            </div>

            <div className="w-full text-center">
              <Button className="w-4/5 mx-auto px-3 py-2 bg-yellow-400 dark:bg-[#FF8C42] rounded-xl hover:bg-yellow-300 dark:hover:bg-[#FF7A24] active:bg-yellow-500 sm:w-3/5"
                onClick={() => confirmDeletion()}>
                Confirm Update
              </Button>
            </div>
          </div>
        }
        
      </div>
    </div>
  )
}




export default function EditProfile({
  user,
}: {
  user: any;
}) {
  const [profile, setProfile] = useState<Profile>({name: user.user_metadata.name,
                                                  email: user.email, 
                                                  location: user.user_metadata.location || '', 
                                                  phone: user.phone || ''});

  const [confirmModal, setConfirmModal] = useState(false);

  const submitForm = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setConfirmModal(true);
  }

  return (
    <div className="relative w-full h-full overflow-auto">
    {confirmModal && <ConfirmPopUp user={user} profile={profile} setModal={setConfirmModal} />}
    <form className="settings-form w-full h-full flex flex-col items-center p-4">
      <div className="w-full max-w-[500px] flex flex-col md:gap-2 md:flex-row">
        <div className="w-full md:w-2/5">
          <label htmlFor="name" className="profile-form-label text-sm">Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            className="w-full h-8 text-base rounded-xl" 
            placeholder={user.user_metadata.name}
            defaultValue={user.user_metadata.name}
            onChange={(e) => {setProfile({...profile, name: e.target.value})}}
          />
        </div>

        {/* <hr className="w-full h-[2px] w-full md:w-5/6 my-2 bg-gray-300 md:hidden" /> */}
        <hr className="profile-form-divider md:w-5/6 md:hidden" />

        <div className="w-full md:w-3/5">
          <label htmlFor="email" className="profile-form-label text-sm">Email</label>
          <input 
            type="text" 
            id="email" 
            name="email" 
            className="w-full h-8 text-base rounded-xl"
            placeholder={user.email}
            defaultValue={user.email}
            onChange={(e) => {setProfile({...profile, email: e.target.value})}} 
          />
        </div>
      </div>

      <hr className="profile-form-divider max-w-[500px] md:w-5/6" />

      <div className="w-full max-w-[500px] flex flex-col md:gap-2 md:flex-row">
        <div className="w-full md:w-2/5">
          <label htmlFor="location" className="profile-form-label text-sm">Location</label>
            <LocationInput defValue={profile.location} profile={profile} setProfile={setProfile} />
        </div>

        <hr className="profile-form-divider md:w-5/6 md:hidden" />

        <div className="w-full md:w-3/5">
          <label htmlFor="phone" className="profile-form-label text-sm">Phone</label>
          <input type="text" id="phone" name="phone"  className="w-full h-8 text-base rounded-xl" defaultValue={user.phone}
            onChange={(e) => {setProfile({...profile, phone: e.target.value})}}></input>
        </div>
      </div>
      
      <div className="w-full max-w-[500px] flex justify-center">
        <Button className="w-full px-3 py-2 my-4 bg-yellow-400 dark:bg-[#FF8C42] rounded-xl hover:bg-yellow-300 dark:hover:bg-[#FF7A24] active:bg-yellow-500"
        onClick={(e) => {submitForm(e)}}>
          Update
        </Button>
      </div>

    </form></div>
  )
}