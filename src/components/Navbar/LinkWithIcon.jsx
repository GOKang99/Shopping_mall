import { NavLink } from "react-router-dom";
import "./LinkWithIcon.css";

const LinkWithIcon = ({ title, link, emoji }) => {
  return (
    //NavLink는 자동으로 active 클래스 추가된다.
    <NavLink to={link} className="align_center">
      {title} <img src={emoji} alt="" className="link_emoji" />
    </NavLink>
  );
};

export default LinkWithIcon;
