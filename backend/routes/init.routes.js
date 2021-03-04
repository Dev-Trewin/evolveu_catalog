
module.exports = app => {
    const init = require("../app/controllers/init.controller.js");
    var router = require("express").Router();


    //Getting drowpdown student list
    router.get("/students", init.getStudent)

    //Create student for list
    router.post('/students', init.createStudent)

    //Getting drowpdown tools list
    router.get("/tools", init.getTool)

    //Create tools for list
    router.post('/tools', init.createTool)

    //Getting cohort_num for list
    router.get('/cohorts', init.getCohort)

    //Create cohort_num for list
    router.post('/cohorts', init.createCohort)

    //Getting project_num for list
    router.get('/projects', init.getProjectNum)

    //Create project_num for list
    router.post('/projects', init.createProjectNum)

    app.use("/api/init", router);
};