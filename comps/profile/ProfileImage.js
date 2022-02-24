import { message, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import Image from "next/image";
import { Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { changeAvatar } from "../../redux/actions/profile/profile";
import { simpleAlert } from "../Alerts";
import avatar from "/public/images/avatar.png";
import styles from "./index.module.scss";

const ProfileImage = ({
  profile,
  changeAvatarError,
  changeAvatarIsLoading,
  loadingImg,
  setLoadingImg,
}) => {
  const dispatch = useDispatch();
  const uploadAvatar = async (file) => {
    if (file.type !== "image") {
      message.error("File is not an image");
    }
    setLoadingImg("avatar");
    const base64 = await convertBase64(file);
    dispatch(changeAvatar(base64));
    setLoadingImg(null);
  };
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  return (
    <div className="profile_picture">
      <Image
        width={50}
        height={50}
        priority
        quality={25}
        src={profile.avatar || avatar}
        layout="responsive"
        className={styles.profile_img}
      />
      <div className="file">
        <ImgCrop>
          <Upload beforeUpload={uploadAvatar}>
            <form>
              {" "}
              {loadingImg == "avatar" ||
              (changeAvatarIsLoading && !changeAvatarError) ? (
                <div style={{ textAlign: "center" }}>
                  <Spinner animation="border" size="md" role="status"></Spinner>
                </div>
              ) : (
                <span style={{ color: "white" }}>
                  {profile.isComplete ? "Change photo" : "Add Photo"}
                </span>
              )}
              {changeAvatarError
                ? simpleAlert("danger", changeAvatarError)
                : null}
            </form>
          </Upload>
        </ImgCrop>
      </div>
    </div>
  );
};

export default ProfileImage;
