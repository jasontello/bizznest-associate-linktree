function ProfileHeader() {
  return (
    <header className="profile-header">
      <div className="profile-image-frame">
        <img
          className="profile-image"
          src={`${import.meta.env.BASE_URL}profile.png`}
          alt="Jason Tello"
        />
      </div>

      <h1 className="profile-name">Jason Tello</h1>
      <p className="profile-role">Design-oriented frontend developer.</p>
      <p className="profile-bio">
        I build accessible, intuitive web experiences with a strong eye for
        design and a love for simple, maintainable code.
      </p>
      <p className="profile-location">Rio Vista, California</p>
    </header>
  );
}

export default ProfileHeader;
