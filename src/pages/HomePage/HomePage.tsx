import * as React from "react";
import SharedStyles from "../../assets/styles/SharedStyles.module.scss";
import ImageUpload from "../../components/ImageUpload/ImageUpload";

class HomePage extends React.Component {
  render() {
    return (
      <div className={SharedStyles.page}>
        <div className={SharedStyles.pageTitle}></div>
        <div className={SharedStyles.mainCard}>
	  <div className={SharedStyles.container} style={{ width: "600px" }}>
	    <ImageUpload />
	  </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
