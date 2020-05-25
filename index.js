// FRAMEWORKS AND VARIABLES
const express = require("express");
const app = express();
const hb = require("express-handlebars");
const projects = require("./data.json");

app.engine("handlebars", hb());
app.set("view engine", "handlebars");

// SERVE CONTENTS
app.use(express.static("./projects"));
app.use(express.static("./public"));

// WELCOME PAGE
app.get("/", (req, res) => {
    res.render("welcome", {
        layout: "main",
        projects,
        // helpers: {
        //     toUpperCase(projects) {
        //         return projects.toUpperCase();
        //     },
        // },
    });
});

// DESCRIPTION PAGES
app.get("/:project/description", (req, res) => {
    const project = req.params.project;
    // const { project } = req.params // is the same as line above
    // console.log(":project:", req.params.project);
    // console.log("project variable:", project)
    const selectedProject = projects.find((item) => item.directory == project); // `projects` refers to the the `const` on top (json-file), `find()` is a method on arrays, `item` is the value of the array at each point in the array during the iteration
    // console.log("selected project:", selectedProject);

    res.render("description", {
        layout: "main",
        projects,
        selectedProject,
        // helpers: {
        //     toUpperCase(projects) {
        //         return projects.toUpperCase();
        //     },
        // },
        // helpers: {
        //     bgc(selectedProject) {
        //         return (selectedProject.style.color = "white");
        //     },
        // },
    });

    if (!selectedProject) {
        return res.sendStatus(404);
    }
});

app.listen(8080, () => console.log("Server Listening!"));
