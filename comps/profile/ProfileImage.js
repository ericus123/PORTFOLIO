import { message, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { changeAvatar } from "../../redux/actions/profile/profile";
import { simpleAlert } from "../Alerts";
import avatar from "/public/images/avatar.png";
import styles from "./index.module.scss";
import { Tooltip } from "antd";

const ProfileImage = ({
  profile,
  changeAvatarError,
  changeAvatarIsLoading,
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
  changeAvatarError && simpleAlert("danger", changeAvatarError);

  const Uploading = () => {
    return (
      <div className={styles.img_uploading}>
        <div className={styles.loading_dots}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  };
  return (
    <div>
      {(changeAvatarIsLoading && !changeAvatarError && <Uploading />) || (
        <ImgCrop>
          <Upload beforeUpload={uploadAvatar}>
            <div className={styles.profile_picture}>
              <Tooltip placement="bottom" title={"Change avatar"}>
                <form>
                  <Image
                    width={50}
                    height={50}
                    priority
                    quality={25}
                    src={profile.avatar || avatar}
                    layout="responsive"
                    className={styles.profile_img}
                  />{" "}
                </form>
              </Tooltip>
            </div>
          </Upload>
        </ImgCrop>
      )}
    </div>
  );
};

export default ProfileImage;