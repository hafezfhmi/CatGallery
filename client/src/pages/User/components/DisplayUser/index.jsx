import styles from "./displayUser.module.css";
import person from "../../../../assets/person-1.jpg";
import Button from "../../../../components/Button";
import { useState } from "react";
import { useUserContext } from "../../../../context/userContext";

const DisplayUser = ({ user }) => {
  // update user function
  const updateUser = useUserContext().updateUser;

  const [openForm, setOpenForm] = useState(false);

  const [data, setData] = useState({
    username: user.username,
    email: user.email,
    fname: user.firstName,
    lname: user.lastName,
  });

  const onChangeHandler = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleForm = () => {
    setOpenForm(!openForm);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!data.email || !data.fname || !data.lname || !data.username) {
      window.alert("All fields are required!");
      return;
    }
    try {
      // get user id from the location
      const userId = Number(window.location.href.slice(-1));
      const dataObj = { ...data, userId };
      // api call
      await updateUser(dataObj);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.displayUser}>
      {user.profilePhotoUrl ? (
        <img src={user.profilePhotoUrl} alt="user profile" />
      ) : (
        <img src={person} alt="user profile" />
      )}
      <h1>{`${user.firstName} ${user.lastName}`}</h1>
      <h2>{`@${user.username}`}</h2>
      <div className={styles.edit_btn_container}>
        <button className={styles.edit_profile} onClick={toggleForm}>
          EDIT
        </button>
      </div>
      {openForm && (
        <div className={styles.update_form}>
          <form onSubmit={submitHandler} className={styles.edit_profile_form}>
            <label className={styles.edit_form_label}>User Name</label>
            <input
              type="text"
              placeholder="Username"
              defaultValue={user.username}
              name="username"
              onChange={onChangeHandler}
              className={styles.edit_prof_input}
            />
            <label className={styles.edit_form_label}>Email</label>
            <input
              type="text"
              placeholder="Email"
              defaultValue={user.email}
              name="email"
              onChange={onChangeHandler}
              className={styles.edit_prof_input}
            />
            <label className={styles.edit_form_label}>First name</label>
            <input
              type="text"
              placeholder="First name"
              defaultValue={user.firstName}
              name="fname"
              onChange={onChangeHandler}
              className={styles.edit_prof_input}
            />
            <label className={styles.edit_form_label}>Last name</label>
            <input
              type="text"
              placeholder="Last name"
              defaultValue={user.lastName}
              name="lname"
              onChange={onChangeHandler}
              className={styles.edit_prof_input}
            />
            <div className={styles.edit_profile_btn_group}>
              <Button
                label="EDIT"
                style={{ marginTop: "1.2rem", width: "100%" }}
              />
              {/*<Button
                label="Reset"
                style={{
                  marginTop: "1.2rem",
                  width: "40%",
                  backgroundColor: "red",
                }}
                onClick={resetForm}
              />*/}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default DisplayUser;
