const PROXY_CONFIG = [
    {
        context: [
            "/insert",
            "/employees",
            "/updateemp",
            "/deleteemp",
            "/skills",
            "/skill"
        ],
        target: "http://localhost:5000",
        secure: false
    }
]

module.exports = PROXY_CONFIG;