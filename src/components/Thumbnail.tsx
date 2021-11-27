import { memo } from "react";

const Thumbnail = ({ user }: any) => {
  return (
    <div
      style={{
        width: "150px",
        height: "200px",
        margin: "10px",
        border: "2px solid grey",
        textAlign: "center",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <img
        style={{
          maxWidth: "125px",
          maxHeight: "125px",
          borderRadius: "9999px",
          margin: "10px auto",
        }}
        src={user.Image}
        alt=""
      />
      <h4>{user.name}</h4>
    </div>
  );
};

export default memo(Thumbnail);
