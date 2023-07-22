import toast from "react-hot-toast";

export const Notify = (type, msg) => {
  switch (type) {
    case "success":
      toast.success(msg);
      break;
    case "error":
      toast.error(msg);
      break;

    default:
      toast(msg, {
        icon: "💡",
        style: {
          borderRadius: "10px",
          border: "3px solid #f0e9e9",
        },
      });
      break;
  }
};
