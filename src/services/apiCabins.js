import supabase, { supabaseUrl } from "./supabase";

export async function createEditCabins(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  //A CREAT A CABIN IF NO ID
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be created");
  }

  if (hasImagePath) return data;

  //uploade image to storage
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //delete the cabin if the was error uploading image

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data?.id);
    console.log(storageError);
    throw new Error(
      "Cabin image could not be uploaded and cabin was not created"
    );
  }

  return data;
}

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be deleted");
  }

  return data;
}
