const formatTime = (str: string) => {
  const [hrs, mins, secs] = str.split(":").map(Number);
  const date = new Date(0, 0, 0, hrs, mins, secs);
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${minutes} minutes ${seconds} seconds`;
};

export default formatTime;