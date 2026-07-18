import api from "./api";

export const getAllBlogs = async () => {
  const response = await api.get("/blogs");
  return response.data;
};

export const getBlogById = async (id: string) => {
  const response = await api.get(`/blogs/${id}`);
  return response.data;
};

export const createBlog = async (blogData: any) => {
  const response = await api.post("/blogs", blogData);
  return response.data;
};

export const updateBlog = async (id: string, blogData: any) => {
  const token = localStorage.getItem("token");

  const response = await api.put(
    `/blogs/${id}`,
    blogData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const deleteBlog = async (id: string) => {
  const token = localStorage.getItem("token");

  const response = await api.delete(`/blogs/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getComments = async (blogId: string) => {
  const response = await api.get(`/comments/${blogId}`);
  return response.data;
};

export const addComment = async (
  blogId: string,
  text: string
) => {
  const token = localStorage.getItem("token");

  const response = await api.post(
    `/comments/${blogId}`,
    { text },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const deleteComment = async (id: string) => {
  const token = localStorage.getItem("token");

  const res = await api.delete(`/comments/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const editComment = async (id: string, text: string) => {
  const token = localStorage.getItem("token");

  const res = await api.put(
    `/comments/${id}`,
    { text },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const toggleSpamStatus = async (id: string) => {
  const token = localStorage.getItem("token");

  const res = await api.put(
    `/comments/${id}/spam`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const likeBlog = async (id: string) => {
  const response = await fetch(`https://blog-platform-backend-1npv.onrender.com/api/blogs/${id}/like`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to like blog");
  }

  return await response.json();
};

