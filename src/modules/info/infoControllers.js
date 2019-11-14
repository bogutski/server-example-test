export const info = (req, res) => {
  const now = new Date();

  const message = {
    timestamp: now.getTime(),
    localeString: now.toLocaleString(),
    getTimezoneOffset: now.getTimezoneOffset(),
    tz: process.env.TZ,
    name: `Progress Monitor v${process.env.npm_package_version}`,
  };

  res.status(200).json(message);
};
