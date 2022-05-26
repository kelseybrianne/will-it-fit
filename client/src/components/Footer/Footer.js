import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.left}>
        <a
          href="https://github.com/kelseybrianne/will-it-fit"
          target="_blank"
          rel="noreferrer"
        >
          <p>GitHub</p>
        </a>
        <Link to={'/contributors'}>
          <p>Contributors</p>
        </Link>
        <div className={styles.contributors}>
          {/* Create modal */}
          {/* <a href="" target="_blank" rel="noreferrer">
            <GitHubIcon style={{ fontSize: 14 }}/>
          </a> */}
        </div>
      </div>
      <div className="right">
        <p>&copy; Will It Fit 2022</p>
      </div>
    </div>
  );
};

export default Footer;
