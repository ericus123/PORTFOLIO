import styles from "./index.module.scss";

const AboutData = ({ profile }) => {
  return (
    <div className="profile_about">
      {profile && (
        <>
          <div className="detail">
            <span className={styles.form_label}>First Name:</span>
            <span className="sp_2">{profile.firstName}</span>
          </div>
          <div className="detail">
            <span className={styles.form_label}>Last Name</span>
            <span className="sp_2">{profile.lastName}</span>
          </div>
          <div className="detail">
            <span className={styles.form_label}>Username</span>
            <span className="sp_2">{profile.username}</span>
          </div>
          <div className="detail">
            <span className={styles.form_label}>Email</span>
            <span className="sp_2">{profile.email}</span>
          </div>
          <div className="detail">
            <span className={styles.form_label}>Role</span>
            <span className="sp_2">{profile.role}</span>
          </div>
          <div className="detail">
            <span className={styles.form_label}>Occupation</span>
            <span className="sp_2">{profile.occupation}</span>
          </div>
          <div className="detail">
            <span className={styles.form_label}>Gender</span>
            <span className="sp_2">{profile.gender}</span>
          </div>
          {profile.isComplete ? (
            <div className="bio">
              <span className={styles.form_label}>Bio:</span>
              <p>{profile.bio}</p>
            </div>
          ) : null}{" "}
        </>
      ) }
    </div>
  );
};

export default AboutData;
