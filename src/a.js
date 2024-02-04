// get local Data

const [LocalData, setLocalData] = useState();

const getlocalData = async () => {
  const data = localStorage.getItem("LoggedInUser");
  if (data) {
    const decryptdata = decryptData(data);
    setLocalData(decryptdata)

    //api function if needed or  store in a state
  } else {
    navigate("/");

    toast.error("Session Expired, Login Again", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
  }
};
