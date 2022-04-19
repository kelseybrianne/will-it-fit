import { Link } from 'react-router-dom';
import auth from '../utils/auth';

export default function LogOut() {
  return (
    <Link to={(location) => location} onClick={auth.logout}>
      log out
    </Link>
  );
}
