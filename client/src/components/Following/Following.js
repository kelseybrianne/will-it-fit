import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Typography,
  Container,
  Dialog,
  Avatar,
  ListItemAvatar,
  ListItemText,
  Divider,
  ListItem,
  List,
} from '@mui/material';
import auth from '../../utils/auth';
import { useParams } from 'react-router-dom';
// graphQL:
import { useQuery } from '@apollo/client';
import { GET_USER } from '../../utils/queries';

const Following = () => {
  let { username } = useParams();
  const [open, setOpen] = React.useState(false);
  const [dense, setDense] = React.useState(false);

  const me = auth.getProfile();

  const { loading, data } = useQuery(
    GET_USER, {

    fetchPolicy: 'no-cache',
    variables: {
        username: username,
      },
    }
  );

  const userData = data?.user || {};
  
  return (
    <div>
      <Button
        variant="contained"
        size="small"
        style={{
          textTransform: 'none',
          backgroundColor: 'transparent',
          ':hover': {
            color: '#5196B8AA',
          },
        }}
        onClick={(e) => {
          setOpen(true);
          e.preventDefault();
        }}
      >
        following
      </Button>

      <div>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <Container
            sx={{
              backgroundColor: '#f3f3f3',
              maxWidth: 500,
              py: 3,
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontFamily: 'var(--serif)',
                textAlign: 'center',
                fontSize: 25,
                py: 2,
                padding: '10px 0px 30px',
              }}
            >
              {username === me.data.username
                ? 'Folks I follow'
                : `Folks ${username}
               follows`}
            </Typography>
            <List dense={dense} sx={{ width: '100%', maxWidth: 360 }}>
              {userData?.following?.map(({ primaryPhoto, _id, username }) => (
                <div key={_id}>
                  <Link
                    to={`/closet/${username}`}
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <ListItem textAlign="center">
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar
                            sx={{ width: 56, height: 56 }}
                            alt={username}
                            src={primaryPhoto}
                          />
                        </ListItemAvatar>
                        <ListItemText sx={{ mx: '10px' }}>
                          <span sx={{ mx: '10px' }}> {username} </span>
                        </ListItemText>
                      </div>
                    </ListItem>
                  </Link>

                  <Divider variant="inset" component="li" />
                </div>
              ))}
            </List>
          </Container>
        </Dialog>
      </div>
    </div>
  );
};

export default Following;
