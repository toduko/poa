import "../styles/Password.css";

const Password = ({ password, setPassword }) => {
  const handleChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <input
      className="Password rounded-corners"
      type="text"
      onChange={handleChange}
      value={password}
      placeholder="Password"
    />
  );
};

export default Password;
