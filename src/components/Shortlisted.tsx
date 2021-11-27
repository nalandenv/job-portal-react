import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { getItem } from "../utils/local-storage";
import { SHORTLISTED, REJECTED } from "../utils/local-storage/config";
import Thumbnail from "./Thumbnail";

export const Shortlisted = () => {
  const [users, setUsers] = useState<any>([]);
  const flag = useLocation().state.name;
  useEffect(() => {
    const currentState = flag === SHORTLISTED ? SHORTLISTED : REJECTED;
    const usersList = getItem(currentState);
    if (!usersList) {
      return;
    }
    setUsers(JSON.parse(usersList));
  }, []);
  const listToRender = users.map((item: any) => {
    return <Thumbnail user={item} />;
  });
  return (
    <div>
      <Link to="/">
        <button>BACK</button>
      </Link>
      <h1>{flag} candidates</h1>
      <div style={{ display: "flex" }}>{listToRender}</div>
    </div>
  );
};
