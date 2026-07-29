/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("games");

  const existing = collection.fields.getByName("uploadedBy");
  if (existing) {
    if (existing.type === "text") {
      return; // field already exists with correct type, skip
    }
    collection.fields.removeByName("uploadedBy"); // exists with wrong type, remove first
  }

  collection.fields.add(new TextField({
    name: "uploadedBy",
    required: true
  }));

  return app.save(collection);
}, (app) => {
  try {
    const collection = app.findCollectionByNameOrId("games");
    collection.fields.removeByName("uploadedBy");
    return app.save(collection);
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("Collection not found, skipping revert");
      return;
    }
    throw e;
  }
})