const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("progressNotes service", async () => {
  let thisService;
  let progressNoteCreated;
  let usersServiceResults;
  let users;

  const tasksCreated = await app.service("tasks").Model.create({"task":"parentObjectId","title":"new value","description":"new value","priority":23,"dueDate":"2026-10-19T14:57:07.815Z","status":true});

  beforeEach(async () => {
    thisService = await app.service("progressNotes");

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
    assert.ok(thisService, "Registered the service (progressNotes)");
  });

  describe("#create", () => {
    const options = {"task":`${tasksCreated._id}`,"title":"new value","description":"new value","priority":23,"dueDate":"2026-10-19T14:57:07.815Z","status":true,"note":"new value"};

    beforeEach(async () => {
      progressNoteCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new progressNote", () => {
      assert.strictEqual(progressNoteCreated.task.toString(), options.task.toString());
assert.strictEqual(progressNoteCreated.note, options.note);
    });
  });

  describe("#get", () => {
    it("should retrieve a progressNote by ID", async () => {
      const retrieved = await thisService.Model.findById(progressNoteCreated._id);
      assert.strictEqual(retrieved._id.toString(), progressNoteCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"task":`${tasksCreated._id}`,"note":"updated value"};

    it("should update an existing progressNote ", async () => {
      const progressNoteUpdated = await thisService.Model.findByIdAndUpdate(
        progressNoteCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(progressNoteUpdated.task.toString(), options.task.toString());
assert.strictEqual(progressNoteUpdated.note, options.note);
    });
  });

  describe("#delete", async () => {
    it("should delete a progressNote", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("tasks").Model.findByIdAndDelete(tasksCreated._id);;

      const progressNoteDeleted = await thisService.Model.findByIdAndDelete(progressNoteCreated._id);
      assert.strictEqual(progressNoteDeleted._id.toString(), progressNoteCreated._id.toString());
    });
  });
});