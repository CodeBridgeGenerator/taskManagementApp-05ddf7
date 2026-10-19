const tasks = require("./tasks/tasks.service.js");
const collaborators = require("./collaborators/collaborators.service.js");
const progressNotes = require("./progressNotes/progressNotes.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(tasks);
  app.configure(collaborators);
  app.configure(progressNotes);
    // ~cb-add-configure-service-name~
};
