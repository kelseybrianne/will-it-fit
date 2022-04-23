import ImageList from '@mui/material/ImageList';
import './Items.css';

import useWindowSize from '../../utils/useWindowSize';
import Item from './Item';

const ItemList = ({ items, savedItems }) => {
  const windowSize = useWindowSize();

  return (
    <ImageList
      variant="masonry"
      cols={windowSize.width > 766 ? 3 : 2}
      gap={windowSize.width > 439 ? 16 : 8}
    >
      {items
        ? items.map((item) => (
            <Item key={item._id} item={item} savedItems={savedItems} />
          ))
        : ''}
    </ImageList>
  );
};

export default ItemList;
