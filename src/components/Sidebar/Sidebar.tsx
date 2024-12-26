import './sidebar.css';
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (

      <div className="sidebar">
        <h2 className="sidebar-title">ToDo App</h2>
        <ul className="sidebar-menu">
          <li className="sidebar-item">
            <Link to="/today" className="sidebar-link">Today</Link>
          </li>
          <li className="sidebar-item">
            <Link to="/history" className="sidebar-link">History</Link>
          </li>
          <li className="sidebar-item">
            <Link to="/important" className="sidebar-link">Important Tasks</Link>
          </li>
        </ul>
      </div>

  );
}
