const express = require("express");
const router = express.Router();

function createApiRouter() {

	var actions = [
		{
			type: "START",
			timestamp: new Date()
		}
	];
    
    function addAction(type) {

		var action = {
            type,
            timestamp: new Date()
        };

		actions.push(action);
		
		return action;
	}

	function getLastAction() {
		return actions[actions.length - 1];
	}
	
	function getLastActionType() {
		return getLastAction().type;
	}

	return function() {


		router.post("/ping", function(req, res, next) {
			var lastActionType = getLastActionType();
			if (lastActionType == "START" || lastActionType === "PONG") {
                var action = addAction("PING");
				res.json(action);
			} else {
				next({
					status: 400,
					message: "can only ping a pong"
				});
			}
		});

		router.post("/pong", function(req, res, next) {
			var lastActionType = getLastActionType();
			if (lastActionType === "PING") {
                var action = addAction("PONG");
				res.json(action);
			} else {
				next({
					status: 400,
					message: "can only pong a ping"
				});
			}
		});

		router.get("/actions", function(req, res, next) {
			res.json({
				actions: actions
			});
		});

		router.get("/lastAction", function(req, res, next) {
			res.json(getLastAction());
		});

		return router;
	};
}

module.exports = createApiRouter;
