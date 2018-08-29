module.exports = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Headers", "environment,authtoken,org_uid,Content-Type,Access-Control-Allow-Headers,Authorization,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS,PUT");
    next();
  };