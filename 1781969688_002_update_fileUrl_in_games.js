/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("games");
  const field = collection.fields.getByName("fileUrl");
  field.maxSize = 209715200;
  return app.save(collection);
}, (app) => {
  try {
  const collection = app.findCollectionByNameOrId("games");
  const field = collection.fields.getByName("fileUrl");
  if (!field) { console.log("Field not found, skipping revert"); return; }
  field.maxSize = 104857600;
  return app.save(collection);
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("Collection or field not found, skipping revert");
      return;
    }
    throw e;
  }
})