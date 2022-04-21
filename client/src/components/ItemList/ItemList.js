import ImageList from '@mui/material/ImageList';
import './Items.css';
import './ItemModal.css';

import useWindowSize from '../../utils/useWindowSize';
import Item from './Item';

const ItemList = ({ items }) => {
  const windowSize = useWindowSize();

  return (
    <ImageList
      variant="masonry"
      cols={windowSize.width > 766 ? 3 : 2}
      gap={window.innerWidth > 339 ? 16 : 8}
    >
      {items ? items.map((item) => <Item item={item} />) : ''}
    </ImageList>
  );
};

export default ItemList;