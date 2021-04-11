const host = {
    'test': "http://v2202101139598140731.supersrv.de:9000",
    'localhost': "http://localhost:9000",
};

//Update this to switch servers
const env = "test";
//const env = "localhost";
//const env = "staging";
//const env = "prod";

const path = host[env];

module.exports = {
    path
}
