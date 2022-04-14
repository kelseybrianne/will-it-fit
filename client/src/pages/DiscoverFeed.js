import Header from "../components/Header";
import "./DiscoverFeed.css";

const DiscoverFeed = () => {
  const images = [
    {
      id: 1,
      img: require("../assets/images/rayul-_M6gy9oHgII-unsplash.jpg"),
    },
    {
      id: 2,
      img: require("../assets/images/brooke-cagle-Ss3wTFJPAVY-unsplash.jpg"),
    },
    {
      id: 3,
      img: require("../assets/images/ivana-cajina-dnL6ZIpht2s-unsplash.jpg"),
    },
    {
      id: 4,
      img: require("../assets/images/daniel-monteiro-VMeHP3mNJL4-unsplash.jpg"),
    },
    {
      id: 5,
      img: require("../assets/images/dom-hill-nimElTcTNyY-unsplash.jpg"),
    },
    {
      id: 6,
      img: require("../assets/images/huston-wilson-WyDr1KFS23Y-unsplash.jpg"),
    },
  ];

  return (
    <div>
      <div className="discover-container">
        {images.map(({ id, img }) => (
          <div
            className={
              id % 2 === 0 ? "img-div-even img-div" : "img-div-odd img-div"
            }
            key={id}
          >
            <img alt="cool-pic" src={img} className="img" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscoverFeed;
