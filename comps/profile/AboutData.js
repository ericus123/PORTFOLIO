const AboutData = ({ profile }) => {
  return (
    <div className="profile_about">
      {profile ? (
        <>
          {" "}
          <div className="detail">
            <span className="sp_1">First Name:</span>
            <span className="sp_2">{profile.firstName}</span>
          </div>
          <div className="detail">
            <span className="sp_1">Last Name</span>
            <span className="sp_2">{profile.lastName}</span>
          </div>
          <div className="detail">
            <span className="sp_1">Username</span>
            <span className="sp_2">{profile.username}</span>
          </div>
          <div className="detail">
            <span className="sp_1">Email</span>
            <span className="sp_2">{profile.email}</span>
          </div>
          <div className="detail">
            <span className="sp_1">Role</span>
            <span className="sp_2">{profile.role}</span>
          </div>
          <div className="detail">
            <span className="sp_1">Occupation</span>
            <span className="sp_2">{profile.occupation}</span>
          </div>
          <div className="detail">
            <span className="sp_1">Gender</span>
            <span className="sp_2">{profile.gender}</span>
          </div>
          {profile.isComplete ? (
            <div className="bio">
              <span className="sp_1">Bio:</span>
              <p>{profile.bio}</p>
            </div>
          ) : null}{" "}
        </>
      ) : null}
    </div>
  );
};

export default AboutData;
