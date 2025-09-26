
import ButtonComponent from "./buttonComponent.jsx";
import BtnContainerComponent from "./btnContainer.jsx";

export default function HeaderComponent({
  searchQuery,
  setSearchQuery,
  onSubmit,
  imageType,
  setImageType,
  showBtnContainer = false,
  videoSrc = null
}) {
  return (
    <div className="header">
      {videoSrc && (
        <video id="backgroundVideo" autoPlay loop muted>
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}
      <div className="header_container">
        <div id="logo">
          <div className="logo-image"></div>

          <div className="head_btn flex">
            <div className="white_btn">
              <select
                name="Panel_btnSearh"
                value={imageType}
                onChange={(e) => setImageType(e.target.value)}
              >
                <option value="Images" disabled>Images</option>
                <optgroup label="Images">
                  <option value="all">all</option>
                  <option value="photo">photo</option>
                  <option value="illustration">illustration</option>
                  <option value="vector">vector</option>
                </optgroup>
                <option value="Videos">Videos</option>
                <option value="Music">Music</option>
                <option value="Sound Effects">Sound Effects</option>
                <option value="GiFs">GiFs</option>
                <option value="Users">GiFs</option>
              </select>
            </div>
            <ButtonComponent className="white_btn" name="LogIn" text="Log in" />
            <ButtonComponent className="white_btn" name="Join" text="Join" />
            <ButtonComponent className="btn" name="upload" text="upload" />
          </div>
        </div>

        <div className="Searh_Container">
          {showBtnContainer && (
            <>
              <div id="StartText">
                Stunning royalty-free images & royalty-free stock
              </div>
              <BtnContainerComponent
                className="container_btns_SearhType"
                onTypeChange={(type) => setImageType(type)}
              />
            </>
          )}
          <div className="Searh" id="VvodSearh">
            <form onSubmit={onSubmit}>
              <button type="submit" id="btnSearh">
                <div className="button-image"></div>
              </button>
              <input
                type="text"
                name="textSearh"
                placeholder="Search for free Images, Videos, Music & more"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
