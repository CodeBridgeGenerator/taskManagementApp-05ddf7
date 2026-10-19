const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("collaborators service", async () => {
  let thisService;
  let collaboratorCreated;
  let usersServiceResults;
  let users;

  const tasksCreated = await app.service("tasks").Model.create({"user":"new value","task":"parentObjectId","title":"new value","description":"new value","priority":23,"dueDate":"2026-10-19T14:57:07.666Z","status":true});

  beforeEach(async () => {
    thisService = await app.service("collaborators");

    // Create users here
    usersServiceResults = await app.service("users").Model.create(usersRefData);
    users = {
      createdBy: usersServiceResults[0]._id,
      updatedBy: usersServiceResults[0]._id,
    };
  });

  after(async () => {
    if (usersServiceResults) {
      await Promise.all(
        usersServiceResults.map((i) =>
          app.service("users").Model.findByIdAndDelete(i._id)
        )
      );
    }
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (collaborators)");
  });

  describe("#create", () => {
    const options = {"user":"new value","task":`${tasksCreated._id}`,"title":"new value","description":"new value","priority":23,"dueDate":"2026-10-19T14:57:07.666Z","status":true};

    beforeEach(async () => {
      collaboratorCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new collaborator", () => {
      assert.strictEqual(collaboratorCreated.user, options.user);
assert.strictEqual(collaboratorCreated.task.toString(), options.task.toString());
assert.strictEqual(collaboratorCreated.status, options.status);
assert.strictEqual(collaboratorCreated.status, options.status);
    });
  });

  describe("#get", () => {
    it("should retrieve a collaborator by ID", async () => {
      const retrieved = await thisService.Model.findById(collaboratorCreated._id);
      assert.strictEqual(retrieved._id.toString(), collaboratorCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"user":"updated value","task":`${tasksCreated._id}`,"status":false};

    it("should update an existing collaborator ", async () => {
      const collaboratorUpdated = await thisService.Model.findByIdAndUpdate(
        collaboratorCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(collaboratorUpdated.user, options.user);
assert.strictEqual(collaboratorUpdated.task.toString(), options.task.toString());
assert.strictEqual(collaboratorUpdated.status, options.status);
assert.strictEqual(collaboratorUpdated.status, options.status);
    });
  });

  describe("#delete", async () => {
    it("should delete a collaborator", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("tasks").Model.findByIdAndDelete(tasksCreated._id);;

      const collaboratorDeleted = await thisService.Model.findByIdAndDelete(collaboratorCreated._id);
      assert.strictEqual(collaboratorDeleted._id.toString(), collaboratorCreated._id.toString());
    });
  });
});