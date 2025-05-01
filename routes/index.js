const {Router:UserRouter} = require("./user");
const {Router : ChatRouter } = require("./chat");
const {Router : GroupRouter } = require("./group");

module.exports = {UserRouter, ChatRouter, GroupRouter}