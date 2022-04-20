  import styles from "./index.module.scss";
  import Image from "next/image";
  import {slicedString} from "../../helpers";

  const AuthorCard = ({image, bio, first_name, last_name}) => {
    return (
      <div className={styles.author_card_container}>
        <div className={styles.author_card}>
          <div className={styles.author_left}><Image   
                src={image}
                alt="Author image"
                height={200}
                width={200}
                quality={25}
                priority
                className={styles.author_image}
                /></div>
          <div className={styles.author_right}>
            <h1>{`${first_name} ${last_name}`}</h1>
            <p>{slicedString( bio || "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form", 100, true)}</p>

            <button className={styles.follow_btn}>
              follow
            </button>
          </div>
        </div>                                                               
      </div>
    );
  };

  export default AuthorCard;
