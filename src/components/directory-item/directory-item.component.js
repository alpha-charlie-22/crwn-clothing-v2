import { useNavigate } from 'react-router-dom';

import { DirectoryItemContainer, BackgroundImage, Body } from './directory-item.styles';

const DirectoryItem = ({ category }) => {
  let navigate = useNavigate();
  const { imageUrl, title, route } = category;

  const handleClick = () => navigate(route);

  return (
    <DirectoryItemContainer
      onClick={handleClick}>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
}

export default DirectoryItem