import { useState } from "react";
import { toast } from "react-hot-toast";

export interface Tag {
  id: number;
  name: string;
  color: string;
}

export interface NewTagForm {
  name: string;
  color: string;
}

export const useTagsTask = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [newTagForm, setNewTagForm] = useState<NewTagForm>({
    name: "",
    color: "#9CA3AF",
  });
  const [loadingCreateTag, setLoadingCreateTag] = useState(false);
  const [loadingGetTags, setLoadingGetTags] = useState(true);

  const getTags = async () => {
    try {
      setLoadingGetTags(true);
      const response = await fetch("/api/tags");
      const data = await response.json();
      setTags(data);
    } catch (error) {
      toast.error("Error on getting tags");
      console.log(error);
    } finally {
      setLoadingGetTags(false);
    }
  };

  const createTag = async () => {
    if (newTagForm.name.trim() === "")
      return toast.error("Tag name is required");

    const duplicate = tags.some(
      (t) => t.name.toLowerCase() === newTagForm.name.trim().toLowerCase(),
    );
    if (duplicate) return toast.error("Tag already exists");

    try {
      setLoadingCreateTag(true);
      const response = await fetch("/api/tags", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTagForm),
      });

      if (!response.ok) {
        toast.error("Failed to create tag");
        return null;
      }

      const created = await response.json();

      toast.success("Tag created");
      setTags([...tags, created]);
      setNewTagForm({ name: "", color: "" });
    } catch (error) {
      toast.error("Error on creating tag");
      console.log(error);
    } finally {
      setLoadingCreateTag(false);
    }
  };

  return {
    tags,
    setTags,
    newTagForm,
    setNewTagForm,
    createTag,
    loadingCreateTag,
    getTags,
    loadingGetTags,
  };
};
