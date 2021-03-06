import React from 'react';
import styles from './Contributors.module.css';
import kelseyProfile from '../../assets/images/kelsey-betteridge-profile.JPG';
import kimProfile from '../../assets/images/Kimothy.jpg';
import jProfile from '../../assets/images/headshot.jpeg';
import mikaylaProfile from '../../assets/images/mukuko-studio-mU88MlEFcoU-unsplash.jpg';

const index = () => {
  return (
    <div>
      <h2 className="page-header">
        Contributors
      </h2>
      <div className={styles.container}>
        <a
          className={styles.contributor}
          href="https://github.com/kelseybrianne"
          target="_blank"
          rel="noreferrer"
        >
          <div>
            <img
              className={styles.profile}
              src={kelseyProfile}
              alt="kelsey's profile"
            />
            <p>Kelsey Betteridge</p>
          </div>
        </a>
        <a
          className={styles.contributor}
          href="https://github.com/kimberlym4488"
          target="_blank"
          rel="noreferrer"
        >
          <div>
            <img
              className={styles.profile}
              src={kimProfile}
              alt="kim's profile"
            />
            <p>Kimberly Moran</p>
          </div>
        </a>
        <a
          className={styles.contributor}
          href="https://github.com/jmichaelbrown8"
          target="_blank"
          rel="noreferrer"
        >
          <div>
            <img className={styles.profile} src={jProfile} alt="J's profile" />
            <p>J. Michael Brown</p>
          </div>
        </a>
        <a
          className={styles.contributor}
          href="https://github.com/MikiWolfe"
          target="_blank"
          rel="noreferrer"
        >
          <div>
            <img
              className={styles.profile}
              src={mikaylaProfile}
              alt="mikayla's profile"
            />
            <p>Mikayla Bruce</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default index;
