import * as React from "react";

import logo from "../../assets/images/WebtoonLogo.png";
import styles from "./Header.module.scss";

class XxxHeader extends React.Component {
  render() {
    return (
        <div className={styles.header}>
          <img src={logo} className={styles.logo} alt="logo" />
          <div className={styles.headerTitle}>Translate Webtoon</div>
        </div>
	
    );
  }
}

export default XxxHeader;
