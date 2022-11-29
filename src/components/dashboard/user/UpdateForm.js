import useAxios from "../../../hooks/useAxios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "../../common/ErrorMessage";

const schema = yup.object().shape({
  title: yup.string().required(),
  body: yup.string().required(),
});

function UpdateForm({ id, title, body }) {
  const [, setUpdating] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const http = useAxios();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function updateYourPost(data) {
    setUpdating(true);
    setUpdated(false);
    setUpdateError(null);

    try {
      const response = await http.put(`posts/${id}`, data);
      console.log("response", response.data);
    } catch (error) {
      console.log(error);
      setUpdateError(error.toString());
    } finally {
      setUpdated(true);
    }
  }

  return (
    <form onSubmit={handleSubmit(updateYourPost)}>
      {updated && <div className="success">The post was updated</div>}
      {updateError && <ErrorMessage>{updateError}</ErrorMessage>}
      <div>
        <label htmlFor="title">Title:</label>
        <input id="title" {...register("title")} defaultValue={title} />
        {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
      </div>
      <div>
        <label htmlFor="message">Message:</label>
        <textarea id="message" {...register("body")} rows={6} defaultValue={body}></textarea>
        {errors.body && <ErrorMessage>{errors.body.message}</ErrorMessage>}
      </div>
      <button className="cta">Update</button>
    </form>
  );
}

export default UpdateForm;
